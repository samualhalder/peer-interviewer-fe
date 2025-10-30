"use client";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/navigation";
import { MdOutlinePhone } from "react-icons/md";
import { endInterviewService } from "@/services/interviewRequest.service";
import RouteChangeGuard from "../RouteGard";

export default function EndMetting({
  roomId,
  stopMyStream,
  showGaurd,
  setShowGaurd,
}: {
  showGaurd: boolean;
  roomId: string;
  stopMyStream: () => void;
  setShowGaurd: (b: boolean) => void;
}) {
  const [showEndMeetingModal, setShowEndMeetingModal] = useState(false);
  const [showListenEndMeetingModal, setShowListenEndMeetingModal] =
    useState(false);
  const socket = useSocket();
  const router = useRouter();
  const handleOnAccept = async () => {
    setShowGaurd(false);
    await endInterviewService(roomId);
    socket?.emit("end-meeting", roomId);
    stopMyStream();
    router.back();
    router.back();
  };
  const handleListenEndMeeting = useCallback(() => {
    setShowListenEndMeetingModal(true);
  }, []);
  useEffect(() => {
    socket?.on(`end-meeting-${roomId}`, handleListenEndMeeting);
    return () => {
      socket?.off(`end-meeting-${roomId}`, handleListenEndMeeting);
    };
  }, [roomId, socket, handleListenEndMeeting]);

  return (
    <>
      <RouteChangeGuard showGaurd={showGaurd} />
      <Modal
        title="End Meeting ?"
        descripton="are you sure,you wan't to end this meeting"
        isOpen={showEndMeetingModal}
        onAccept={handleOnAccept}
        onClose={() => setShowEndMeetingModal(false)}
      />
      <Modal
        title="Ending Meeting"
        descripton="Other person have ended this meeting,So we are takeing you back"
        isOpen={showListenEndMeetingModal}
        onClose={() => {
          setShowGaurd(false);
          stopMyStream();
          router.back();
          router.back();
        }}
      />
      <Button
        className="bg-red-500 text-white text-sm"
        onClick={() => setShowEndMeetingModal((pre) => !pre)}
        hover="end meeting"
        size="sm"
      >
        <MdOutlinePhone />
      </Button>
    </>
  );
}

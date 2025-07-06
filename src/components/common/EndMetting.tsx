"use client";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/navigation";
import { MdOutlinePhone } from "react-icons/md";

export default function EndMetting({
  roomId,
  stopMyStream,
}: {
  roomId: string;
  stopMyStream: () => void;
}) {
  const [showEndMeetingModal, setShowEndMeetingModal] = useState(false);
  const [showListenEndMeetingModal, setShowListenEndMeetingModal] =
    useState(false);
  const socket = useSocket();
  const router = useRouter();
  const handleOnAccept = () => {
    socket?.emit("end-meeting", roomId);
    stopMyStream();
    router.back();
  };
  const handleListenEndMeeting = useCallback(() => {
    console.log("listned");

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
          stopMyStream();
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

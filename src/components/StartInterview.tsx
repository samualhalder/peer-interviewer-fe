"use client";
import React, { useContext, useEffect, useState } from "react";

import { createChatId } from "@/utils/createChatId";
import { useSocket } from "@/context/SocketContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { useRouter } from "next/navigation";
import PeerService from "@/services/peer.service";

import { isAccepted as isAcceptedService } from "@/services/interviewRequest.service";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { UserContext } from "./layouts/UserPageLayout";

export default function StartInterview() {
  const to = useContext(UserContext);
  const { user } = useSelector((state: RootState) => state.user);
  const socket = useSocket();
  const [isAccepted, setIsAccepted] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const currentRoom = createChatId(to?.id as string, user?.id as string);
  const [remoteDescription, setRemoteDescription] =
    useState<RTCSessionDescription | null>(null);
  const router = useRouter();
  const handleInterviewRequest = (data: any) => {
    const { room, offer } = data;
    setRemoteDescription(offer);
    if (room == currentRoom) {
      setShowRequestModal(true);
    }
  };
  const onAccept = async () => {
    if (remoteDescription) {
      const answer = await PeerService.getAnswer(remoteDescription);
      socket?.emit("call-accepted", { room: currentRoom, answer });
    }
    router.push(`/interview-room/${currentRoom}`);
  };
  const onReject = () => {
    setShowRequestModal(false);
    socket?.emit("request-declined", { room: currentRoom });
  };
  useEffect(() => {
    socket?.on("interview-start-request", handleInterviewRequest);

    return () => {
      socket?.off("interview-start-request");
    };
  });

  useEffect(() => {
    const checkIsAccepted = async (id: string) => {
      const res = await isAcceptedService(id);
      setIsAccepted(res);
    };

    if (to?.id) checkIsAccepted(to.id);
  }, [to?.id]);
  const handleStartInterview = async () => {
    const room = createChatId(to?.id as string, user?.id as string);
    const offer = await PeerService.getOffer();
    socket?.emit("start-interview", { room, offer });
    router.push(`/interview-room/${room}`);
  };

  return (
    <>
      {isAccepted && (
        <Button className="w-full bg-green-500" onClick={handleStartInterview}>
          Start The Interview
        </Button>
      )}
      <Modal
        isOpen={showRequestModal}
        title={"Incoming Call"}
        descripton="You got the interview call accept to continue with the interview."
        onAccept={onAccept}
        onClose={onReject}
      />
    </>
  );
}

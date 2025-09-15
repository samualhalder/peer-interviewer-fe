"use client";
import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import PeerService from "@/services/peer.service";


import { createRoomId } from "@/utils/createRoom";
import CallPopUp from "./common/CallPopUp";

export default function CatchIntRequest() {
  const { user } = useSelector((state: RootState) => state.user);
  const socket = useSocket();
  const router = useRouter();
  const [currentRoom, setCurrentRoom] = useState(null);
  const [peerId, setpeerId] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [remoteDescription, setRemoteDescription] =
    useState<RTCSessionDescription | null>(null);

  const handleInterviewRequest = async (data: any) => {
    const { offer, userId, peerId } = data;
    if (user?.id == userId) {
      setRemoteDescription(offer);
      setShowRequestModal(true);
      setpeerId(peerId);
    }
  };
  useEffect(() => {
    const fetchRoomId = async (peerId: string) => {
      const res = await createRoomId(user?.id as string, peerId as string);
      setCurrentRoom(res);
    };
    if (peerId) fetchRoomId(peerId);
  }, [user, peerId]);

  const onAccept = async () => {
    if (remoteDescription) {
      const answer = await PeerService.getAnswer(remoteDescription);
      socket?.emit("call-accepted", { room: currentRoom, answer });
    }
    router.push(`/interview-room/${currentRoom}?peerId=${peerId}`);
    setpeerId(null);
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

  return (
    <>
      <CallPopUp
        isOpen={showRequestModal}
        title={"Incoming Call"}
        descripton="You got the interview call accept to continue with the interview."
        onAccept={onAccept}
        onClose={onReject}
      />
    </>
  );
}

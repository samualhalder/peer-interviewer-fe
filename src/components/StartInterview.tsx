"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import PeerService from "@/services/peer.service";
import { isAccepted as isAcceptedService } from "@/services/interviewRequest.service";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { UserContext } from "./layouts/UserPageLayout";
import { createRoomId } from "@/utils/createRoom";

export default function StartInterview() {
  const to = useContext(UserContext);
  const { user } = useSelector((state: RootState) => state.user);
  const socket = useSocket();
  const [isAccepted, setIsAccepted] = useState(false);
  const router = useRouter();
  const [currentRoom, setCurrentRoom] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [remoteDescription, setRemoteDescription] =
    useState<RTCSessionDescription | null>(null);

  useEffect(() => {
    const fetchRoomId = async () => {
      const res = await createRoomId(user?.id as string, to?.id as string);
      setCurrentRoom(res);
    };
    fetchRoomId();
  }, [user, to]);

  const handleInterviewRequest = async (data: any) => {
    const { room, offer } = data;
    if (room == currentRoom) {
      setRemoteDescription(offer);
      setShowRequestModal(true);
    }
  };

  const onAccept = async () => {
    if (remoteDescription) {
      const answer = await PeerService.getAnswer(remoteDescription);
      socket?.emit("call-accepted", { room: currentRoom, answer });
    }
    router.push(`/interview-room/${currentRoom}?peerId=${to?.id}`);
  };

  const onReject = () => {
    setShowRequestModal(false);
    socket?.emit("request-declined", { room: currentRoom });
  };

  useEffect(() => {
    socket?.on("interview-start-request", handleInterviewRequest);

    return () => {
      socket?.off("interview-start-request", handleInterviewRequest);
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
    // TODO: dont need to call this api just take room id from isAccepted service
    const room = await createRoomId(to?.id as string, user?.id as string);
    const offer = await PeerService.getOffer();
    socket?.emit("start-interview", {
      room,
      offer,
      userId: user?.id,
      peerId: to?.id,
    });
    router.push(`/interview-room/${room}?peerId=${to?.id}`);
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

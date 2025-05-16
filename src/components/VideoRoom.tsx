"use client";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "./ui/Modal";
import ReactPlayer from "react-player";
import PeerService from "@/services/peer.service";

interface propType {
  roomId: string;
}
export default function VideoRoom(props: propType) {
  const socket = useSocket();
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    const fetchMyStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
    };
    fetchMyStream();
  }, []);

  const handleOtherUserAcceptedCall = useCallback(
    async (data: { room: string; answer: RTCSessionDescription }) => {
      alert("other user accepted call");
      await PeerService.setLocalDescription(data.answer);
    },
    []
  );

  useEffect(() => {
    socket?.on(`declined-${props.roomId}`, () => {
      setShowWarning(true);
    });
    socket?.on(`call-accepted-${props.roomId}`, handleOtherUserAcceptedCall);
    return () => {
      socket?.off(`declined-${props.roomId}`);
      socket?.off(`call-accepted-${props.roomId}`);
    };
  }, [props.roomId]);

  return (
    <div>
      <Modal
        isOpen={showWarning}
        title="Other person rejected you interview call"
        descripton="we are taking you back"
        onClose={() => {
          setShowWarning(false);
          router.back();
        }}
      />
      {
        <ReactPlayer
          url={myStream as MediaStream}
          playing={true}
          height="400px"
          width="300px"
          muted
        />
      }
    </div>
  );
}

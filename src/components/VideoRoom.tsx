"use client";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Modal from "./ui/Modal";

interface propType {
  roomId: string;
}
export default function VideoRoom(props: propType) {
  const socket = useSocket();
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  useEffect(() => {
    socket?.on(`declined-${props.roomId}`, () => {
      setShowWarning(true);
    });
    return () => {
      socket?.off(`declined-${props.roomId}`);
    };
  }, [props.roomId]);
  return (
    <>
      <Modal
        isOpen={showWarning}
        title="Other person rejected you interview call"
        descripton="we are taking you back"
        onClose={() => {
          setShowWarning(false);
          router.back();
        }}
      />
    </>
  );
}

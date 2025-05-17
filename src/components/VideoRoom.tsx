"use client";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "./ui/Modal";
import ReactPlayer from "react-player";
import PeerService from "@/services/peer.service";
import Button from "./ui/Button";
import VideoWindow from "./common/VideoWindow";
import ProfilePageLayout from "./layouts/ProfilePageLayout";
import Flex from "./ui/Flex";
import Break from "./common/Break";

interface propType {
  roomId: string;
}
export default function VideoRoom(props: propType) {
  const socket = useSocket();
  const router = useRouter();

  const [showWarning, setShowWarning] = useState(false);
  const [myStream, setMyStream] = useState<MediaStream | null>();
  const [remoteStream, setRemoteStream] = useState<any>(null);
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
  const [tracksAdded, setTracksAdded] = useState(false);

  const sendRemoteStream = useCallback(() => {
    if (myStream && PeerService.peer && !tracksAdded) {
      myStream.getTracks().forEach((track) => {
        PeerService.peer!.addTrack(track, myStream);
      });
      setTracksAdded(true);
    }
  }, [myStream, tracksAdded]);

  const handleOtherUserAcceptedCall = useCallback(
    async (data: { room: string; answer: RTCSessionDescription }) => {
      console.log("call-acc", data.answer);
      await PeerService.setLocalDescription(data.answer);
      sendRemoteStream(); // Only this call
    },
    [sendRemoteStream]
  );

  const handleNegosiationNeed = useCallback(
    async (data: { offer: RTCSessionDescription }) => {
      console.log("nego-need", data.offer);

      const answer = await PeerService.getAnswer(data.offer);
      socket?.emit("nego-done", { room: props.roomId, answer });
    },
    [socket, props.roomId]
  );
  const handleNegosiationDone = useCallback(
    async (data: { answer: RTCSessionDescription }) => {
      console.log("nego-done", data.answer);

      await PeerService.setLocalDescription(data.answer);
    },
    []
  );
  const handleNegosiationNeeded = useCallback(async () => {
    console.log("peer-nego-need");

    const offer = await PeerService.getOffer();
    socket?.emit("nego-needed", { offer, room: props.roomId });
  }, []);

  useEffect(() => {
    PeerService.peer?.addEventListener(
      "negotiationneeded",
      handleNegosiationNeeded
    );
    return () => {
      PeerService.peer?.removeEventListener(
        "negotiationneeded",
        handleNegosiationNeeded
      );
    };
  }, [socket, props.roomId]);

  const handleTrack = async (ev: any) => {
    const remoteStream = ev.streams;
    setRemoteStream(remoteStream[0]);
    console.log("check-rs", remoteStream[0]);
  };
  const handleIceCandidate = (event: any) => {
    if (event.candidate) {
      socket?.emit("ice-candidate", {
        room: props.roomId, // Ensure the right room is targeted
        candidate: event.candidate,
      });
    }
  };

  useEffect(() => {
    PeerService.peer?.addEventListener("track", handleTrack);
    PeerService.peer?.addEventListener("icecandidate", handleIceCandidate);
    return () => {
      PeerService.peer?.removeEventListener("track", handleTrack);
      PeerService.peer?.removeEventListener("icecandidate", handleIceCandidate);
    };
  }, []);

  useEffect(() => {
    socket?.on(`declined-${props.roomId}`, () => {
      setShowWarning(true);
    });
    socket?.on(`call-accepted-${props.roomId}`, handleOtherUserAcceptedCall);
    socket?.on(`nego-need-${props.roomId}`, handleNegosiationNeed);
    socket?.on(`nego-done-${props.roomId}`, handleNegosiationDone);
    socket?.on(`ice-candidate-${props.roomId}`, (data) => {
      if (data.candidate) {
        PeerService.peer?.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    });
    return () => {
      socket?.off(`declined-${props.roomId}`);
      socket?.off(`call-accepted-${props.roomId}`);
      socket?.off(`nego-need-${props.roomId}`, handleNegosiationNeed);
      socket?.off(`nego-done-${props.roomId}`, handleNegosiationDone);
      socket?.off(`ice-candidate-${props.roomId}`);
    };
  }, [
    props.roomId,
    handleNegosiationDone,
    handleNegosiationNeed,
    handleOtherUserAcceptedCall,
    socket,
  ]);

  return (
    <div className="h-[100%] overflow-hidden ">
      <Modal
        isOpen={showWarning}
        title="Other person rejected you interview call"
        descripton="we are taking you back"
        onClose={() => {
          setShowWarning(false);
          router.back();
        }}
      />
      <div className="p-2 grid md:grid-cols-3 gap-2 overflow-y-hidden ">
        <Flex
          justify="around"
          gap="3xl"
          className="border-2 border-myprimary rounded-md p-2"
        >
          <VideoWindow stream={myStream as MediaStream} name="Samual Halder" />
          <VideoWindow stream={remoteStream} name="User 1" />
          <Break color="#025AE0" />
          <Button onClick={sendRemoteStream}>📹</Button>
        </Flex>
        <Flex>dfsaljf</Flex>
      </div>
    </div>
  );
}

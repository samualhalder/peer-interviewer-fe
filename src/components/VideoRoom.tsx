"use client";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "./ui/Modal";
import PeerService from "@/services/peer.service";
import Button from "./ui/Button";
import VideoWindow from "./common/VideoWindow";
import Flex from "./ui/Flex";

interface propType {
  roomId: string;
}
export default function VideoRoom(props: propType) {
  const socket = useSocket();
  const router = useRouter();

  const [showWarning, setShowWarning] = useState(false);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null); // for screen share
  const [remoteCameraStream, setRemoteCameraStream] =
    useState<MediaStream | null>(null);
  const [remoteScreenStream, setRemoteScreenStream] =
    useState<MediaStream | null>(null);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  const [screenPermission, setScreenPermission] = useState(false);
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
    socket?.emit("share-video", { room: props.roomId });
    if (myStream && PeerService.peer && !tracksAdded) {
      myStream.getTracks().forEach((track) => {
        PeerService.peer!.addTrack(track, myStream);
      });
      setTracksAdded(true);
    }
  }, [myStream, tracksAdded]);

  const handleOtherUserAcceptedCall = useCallback(
    async (data: { room: string; answer: RTCSessionDescription }) => {
      await PeerService.setLocalDescription(data.answer); // actually remote desctiption
      sendRemoteStream(); // Only this call
    },
    [sendRemoteStream]
  );
  // ----------------- negosiation-------------------

  // #0 : peer connection will notify when we start the negosiation
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

  // #1. first step of negosiation user create offer and send for other user
  const handleNegosiationNeeded = useCallback(async () => {
    const offer = await PeerService.getOffer();
    socket?.emit("nego-needed", { offer, room: props.roomId });
  }, []);

  // #2: here the user get  the offer and create ans and send to the first user
  const handleNegosiationNeed = useCallback(
    async (data: { offer: RTCSessionDescription }) => {
      const answer = await PeerService.getAnswer(data.offer);
      socket?.emit("nego-done", { room: props.roomId, answer });
    },
    [socket, props.roomId]
  );
  // #3: now first user accept that answer and complete the negosiation cycle
  const handleNegosiationDone = useCallback(
    async (data: { answer: RTCSessionDescription }) => {
      console.log("nego-done", data.answer);

      await PeerService.setLocalDescription(data.answer);
    },
    []
  );

  const handleTrack = async (ev: any) => {
    const remoteStream = ev.streams[0];

    const cameraTrack = remoteStream.getVideoTracks()[0]; // First video track is camera
    const screenTrack = remoteStream.getVideoTracks()[1]; // Second video track is screen

    const cameraStream = new MediaStream(cameraTrack ? [cameraTrack] : []);
    const screenStream = new MediaStream(screenTrack ? [screenTrack] : []);

    setRemoteCameraStream(cameraStream); // Store only camera feed
    setRemoteScreenStream(screenStream); // Store only screen share
  };

  //------------------- ice-candidate----------------------------

  //#0: need ice-candidate stablishment to shate the video shareign
  const handleIceCandidate = useCallback(
    (event: any) => {
      if (event.candidate) {
        socket?.emit("ice-candidate", {
          room: props.roomId, // Ensure the right room is targeted
          candidate: event.candidate,
        });
      }
    },
    [socket, props.roomId]
  );

  //#1: other user adding that ice-candidate
  const handleAddIceCandidate = useCallback((data: any) => {
    if (data.candidate) {
      PeerService.peer?.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  }, []);

  useEffect(() => {
    PeerService.peer?.addEventListener("track", handleTrack);
    PeerService.peer?.addEventListener("icecandidate", handleIceCandidate);
    return () => {
      PeerService.peer?.removeEventListener("track", handleTrack);
      PeerService.peer?.removeEventListener("icecandidate", handleIceCandidate);
    };
  }, []);

  //---------------video audio staritng and permissions-------------

  const handleScreenSharing = useCallback((data: any) => {
    const recordedBlob = new Blob([data.videoBlob], { type: "video/webm" });
    const videoUrl = URL.createObjectURL(recordedBlob);

    setRecordedVideoUrl(videoUrl); // ✅ Update state instead of manipulating DOM directly
  }, []);

  const handleAudioPermission = useCallback(() => {
    setAudioPermission(true);
  }, []);
  const handleVideoPermission = useCallback(() => {
    setCameraPermission(true);
  }, []);
  const handleScreenShareingPermission = useCallback(() => {
    setScreenPermission((pre) => !pre);
  }, []);

  useEffect(() => {
    socket?.on(`declined-${props.roomId}`, () => {
      setShowWarning(true);
    });
    socket?.on(`call-accepted-${props.roomId}`, handleOtherUserAcceptedCall);
    socket?.on(`nego-need-${props.roomId}`, handleNegosiationNeed);
    socket?.on(`nego-done-${props.roomId}`, handleNegosiationDone);
    socket?.on(`ice-candidate-${props.roomId}`, handleAddIceCandidate);

    socket?.on(`screen-recording-${props.roomId}`, handleScreenSharing);
    socket?.on(`audio-${props.roomId}`, handleAudioPermission);
    socket?.on(`video-${props.roomId}`, handleVideoPermission);
    socket?.on(`screen-${props.roomId}`, handleScreenShareingPermission);

    return () => {
      socket?.off(`declined-${props.roomId}`);
      socket?.off(`call-accepted-${props.roomId}`);
      socket?.off(`nego-need-${props.roomId}`, handleNegosiationNeed);
      socket?.off(`nego-done-${props.roomId}`, handleNegosiationDone);
      socket?.off(`ice-candidate-${props.roomId}`, handleAddIceCandidate);
      socket?.off(`screen-recording-${props.roomId}`, handleScreenSharing);
      socket?.off(`audio-${props.roomId}`, handleAudioPermission);
      socket?.off(`video-${props.roomId}`, handleVideoPermission);
      socket?.off(`screen-${props.roomId}`, handleScreenShareingPermission);
    };
  }, [
    props.roomId,
    handleNegosiationDone,
    handleNegosiationNeed,
    handleOtherUserAcceptedCall,
    socket,
    handleIceCandidate,
    handleAudioPermission,
    handleVideoPermission,
    handleScreenShareingPermission,
    handleAddIceCandidate,
    handleScreenSharing,
  ]);

  const stopScreenShare = (screenTrack: MediaStreamTrack) => {
    console.log("⛔ Stopping screen share...");

    PeerService.peer?.getSenders().forEach((sender) => {
      if (sender.track === screenTrack) {
        sender.replaceTrack(null);
      }
    });

    // Remove screen track but keep camera active
    setMyStream((prevStream) => {
      const newStream = new MediaStream(
        prevStream!.getTracks().filter((t) => t !== screenTrack)
      );
      return newStream;
    });

    console.log("✅ Screen share stopped, camera remains active!");
  };
  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const screenTrack = screenStream.getVideoTracks()[0];

      if (PeerService.peer) {
        PeerService.peer.addTrack(screenTrack, screenStream); // ✅ Add screen stream

        myStream?.getTracks().forEach((track) => {
          PeerService.peer!.addTrack(track, myStream!); // ✅ Keep camera active
        });
      }

      setMyStream(new MediaStream([...myStream!.getTracks(), screenTrack])); // ✅ Merge both streams

      socket?.emit("share-screen", { room: props.roomId });

      screenTrack.onended = () => {
        stopScreenShare(screenTrack);
      };

      console.log("✅ Screen sharing started while keeping camera active!");
    } catch (error) {
      console.error("Error starting screen share:", error);
    }
  };
  useEffect(() => {
    sendRemoteStream();
  }, []);

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
          className="border-2 border-myprimary rounded-md p-2 col-span-1 z-10 bg-myprimary"
        >
          <VideoWindow
            stream={myStream as MediaStream}
            name="Samual Halder"
            audio={false}
            video={true}
          />

          <VideoWindow
            stream={remoteCameraStream}
            name="User 1"
            audio={audioPermission}
            video={cameraPermission}
          />

          <div className=" flex  gap-3">
            <Button onClick={sendRemoteStream} variant="outline">
              Share Video
            </Button>
            <Button onClick={startScreenShare} variant="outline">
              Share Screen
            </Button>
          </div>
        </Flex>
        <Flex className="col-span-2" justify="start">
          <VideoWindow
            stream={remoteScreenStream}
            audio={false}
            video={screenPermission}
          />
        </Flex>
      </div>
    </div>
  );
}

"use client";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/navigation";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "./ui/Modal";
import PeerService from "@/services/peer.service";
import Button from "./ui/Button";
import VideoWindow from "./common/VideoWindow";
import Flex from "./ui/Flex";
import ReactPlayer from "react-player";
import { FiCamera, FiMessageSquare, FiMic, FiMicOff } from "react-icons/fi";
import { FiCameraOff } from "react-icons/fi";
import { LuScreenShare } from "react-icons/lu";
import { useGetUserById } from "@/hooks/useGetUserById";
import { UserType } from "@/types/entity.types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Chat from "./common/Chat";
import EndMetting from "./common/EndMetting";
interface propType {
  roomId: string;
  peerId: string;
}
export default function VideoRoom(props: propType) {
  const socket = useSocket();
  const router = useRouter();
  const peer = useGetUserById(props.peerId);
  const user = useSelector((state: RootState) => state.user.user);

  const [showWarning, setShowWarning] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showGaurd, setShowGaurd] = useState(true);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null); // for screen share
  const [remoteCameraStream, setRemoteCameraStream] =
    useState<MediaStream | null>(null);
  const [remoteScreenStream, setRemoteScreenStream] =
    useState<MediaStream | null>(null);
  const screenTrackIds = useRef<Set<string>>(new Set());

  const [myCameraPermission, setMyCameraPermission] = useState(false);
  const [peerCameraPermission, setPeerCameraPermission] = useState(false);
  const [myAudioPermission, setMyAudioPermission] = useState(false);
  const [peerAudioPermission, setPeerAudioPermission] = useState(false);

  console.log(recordedVideoUrl);

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
      await PeerService.setLocalDescription(data.answer);
    },
    []
  );

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

  const handlePeerCameraPermission = useCallback(() => {
    setPeerCameraPermission((pre) => !pre);
  }, []);
  const handlePeerAudioPermission = useCallback(() => {
    setPeerAudioPermission((pre) => !pre);
  }, []);
  const handleSetTrackId = useCallback(({ trackId }: { trackId: string }) => {
    screenTrackIds.current.add(trackId);
  }, []);

  //--------------------Video audio screen sharing---------------

  // #1: fetch local users media (camera) and show it to him only
  useEffect(() => {
    //   fetchMyStream();
  }, []);
  const fetchMyStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
    return stream;
  };
  const stopMyStream = () => {
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
      setMyStream(null);
    }
  };

  // #2: Sending local users media to other peer

  const sendRemoteStream = useCallback(async () => {
    const stream = await fetchMyStream();
    socket?.emit("camera-permission", { roomId: props.roomId });
    setMyCameraPermission((pre) => !pre);

    if (stream && PeerService.peer) {
      stream.getTracks().forEach((track) => {
        PeerService.peer!.addTrack(track, stream);
      });
    }
  }, [myStream, socket, props.roomId]);

  const sendAudio = useCallback(async () => {
    socket?.emit("audio-permission", { roomId: props.roomId });
    setMyAudioPermission((pre) => !pre);
    const stream = await fetchMyStream();

    if (stream && PeerService.peer) {
      stream.getTracks().forEach((track) => {
        PeerService.peer!.addTrack(track, stream);
      });
    }
  }, [myStream, socket, props.roomId]);

  const handleOtherUserAcceptedCall = useCallback(
    async (data: { room: string; answer: RTCSessionDescription }) => {
      await PeerService.setLocalDescription(data.answer); // actually remote desctiption
    },
    []
  );

  const handleTrack = async (ev: any) => {
    const track = ev.track;

    if (track.kind === "video") {
      const stream = new MediaStream([track]);
      if (screenTrackIds.current.has(track.id)) {
        setRemoteScreenStream(stream);
      } else {
        setRemoteCameraStream(stream);
      }
    }
  };

  const stopScreenShare = (screenTrack: MediaStreamTrack) => {
    socket?.emit("stoping-screen-sharing", { roomId: props.roomId });
    screenTrackIds.current.clear();
    setRemoteScreenStream(null);
    PeerService.peer?.getSenders().forEach((sender) => {
      if (sender.track === screenTrack) {
        sender.replaceTrack(null);
      }
    });

    // Remove screen track but keep camera active
    // setMyStream((prevStream) => {
    //   const newStream = new MediaStream(
    //     prevStream!.getTracks().filter((t) => t !== screenTrack)
    //   );
    //   return newStream;
    // });
  };
  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const videoStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      const screenTrack = screenStream.getVideoTracks()[0];

      socket?.emit("sharing-screen-tracks", {
        roomId: props.roomId,
        trackId: screenTrack.id,
      });

      screenStream
        .getTracks()
        .forEach((track) => PeerService.peer?.addTrack(track, videoStream));
      videoStream
        .getTracks()
        .forEach((tracks) => PeerService.peer?.addTrack(tracks, videoStream));

      //   if (PeerService.peer) {
      //     PeerService.peer.addTrack(screenTrack, screenStream); // ✅ Add screen stream

      //     myStream?.getTracks().forEach((track) => {
      //       PeerService.peer!.addTrack(track, myStream!); // ✅ Keep camera active
      //     });
      //   }

      //   setMyStream(new MediaStream([...myStream!.getTracks(), screenTrack])); // ✅ Merge both streams

      socket?.emit("share-screen", { room: props.roomId });

      screenTrack.onended = () => {
        stopScreenShare(screenTrack);
      };
    } catch (error) {
      console.error("Error starting screen share:", error);
    }
  };
  const handleEndScreenShareing = () => {
    screenTrackIds.current.clear();
    setRemoteScreenStream(null);
  };
  //   useEffect(() => {
  //     sendRemoteStream();
  //   }, []);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (videoRef.current && remoteScreenStream) {
      videoRef.current.srcObject = remoteScreenStream;
    }
  }, [remoteScreenStream]);

  useEffect(() => {
    socket?.on(`declined-${props.roomId}`, () => {
      setShowWarning(true);
    });
    socket?.on(`call-accepted-${props.roomId}`, handleOtherUserAcceptedCall);
    socket?.on(`nego-need-${props.roomId}`, handleNegosiationNeed);
    socket?.on(`nego-done-${props.roomId}`, handleNegosiationDone);
    socket?.on(`ice-candidate-${props.roomId}`, handleAddIceCandidate);

    socket?.on(`screen-recording-${props.roomId}`, handleScreenSharing);
    socket?.on(`audio-permission-${props.roomId}`, handlePeerAudioPermission);
    socket?.on(`camera-permission-${props.roomId}`, handlePeerCameraPermission);
    socket?.on(`incoming-screen-sharing-${props.roomId}`, handleSetTrackId);
    socket?.on(`end-screen-sharing-${props.roomId}`, handleEndScreenShareing);

    return () => {
      socket?.off(`declined-${props.roomId}`);
      socket?.off(`call-accepted-${props.roomId}`);
      socket?.off(`nego-need-${props.roomId}`, handleNegosiationNeed);
      socket?.off(`nego-done-${props.roomId}`, handleNegosiationDone);
      socket?.off(`ice-candidate-${props.roomId}`, handleAddIceCandidate);
      socket?.off(`screen-recording-${props.roomId}`, handleScreenSharing);
      socket?.off(
        `audio-permission-${props.roomId}`,
        handlePeerAudioPermission
      );
      socket?.off(
        `camera-permission-${props.roomId}`,
        handlePeerCameraPermission
      );
      socket?.off(`incoming-screen-sharing-${props.roomId}`, handleSetTrackId);
      socket?.off(
        `end-screen-sharing-${props.roomId}`,
        handleEndScreenShareing
      );
    };
  }, [
    props.roomId,
    handleNegosiationDone,
    handleNegosiationNeed,
    socket,
    handleIceCandidate,
    handlePeerAudioPermission,
    handlePeerCameraPermission,
    handleAddIceCandidate,
    handleScreenSharing,
    handleSetTrackId,
    handleOtherUserAcceptedCall,
  ]);

  return (
    <div className="h-full w-full ">
      <Modal
        isOpen={showWarning}
        title="Other person rejected you interview call"
        descripton="we are taking you back"
        onClose={() => {
          setShowGaurd(false);
          setShowWarning(false);
          router.back();
        }}
      />
      <div className="h-[100vh] p-2 grid md:grid-cols-4 gap-1 ">
        <Flex
          justify="center"
          gap="3xl"
          className="h-[98vh] border-2 border-myprimary rounded-md p-2 col-span-1 z-10 bg-myprimary"
        >
          <VideoWindow
            stream={myStream as MediaStream}
            name={user?.name}
            audio={myAudioPermission}
            video={myCameraPermission}
          />

          <VideoWindow
            stream={remoteCameraStream}
            audio={peerAudioPermission}
            name={peer.user?.name || "abc"}
            video={peerCameraPermission}
          />

          <div className=" flex  gap-2">
            <Button
              onClick={sendRemoteStream}
              variant="outline"
              hover={myCameraPermission ? "off camera" : "on camera"}
              size="sm"
            >
              {myCameraPermission ? <FiCamera /> : <FiCameraOff />}
            </Button>
            <Button
              onClick={sendAudio}
              variant="outline"
              hover={myAudioPermission ? "off mic" : "on mic"}
            >
              {myAudioPermission ? <FiMic /> : <FiMicOff />}
            </Button>
            <Button
              onClick={startScreenShare}
              variant="outline"
              hover="screen share"
            >
              <LuScreenShare />
            </Button>
            <Button
              onClick={() => setIsChatOpen((pre) => !pre)}
              variant="outline"
              hover="chat"
            >
              <FiMessageSquare />
            </Button>
            <EndMetting
              roomId={props.roomId}
              stopMyStream={stopMyStream}
              showGaurd={showGaurd}
              setShowGaurd={setShowGaurd}
            />
          </div>
        </Flex>
        <Flex
          className={`${
            isChatOpen ? "col-span-2" : "col-span-3"
          } bg-blue-400 overflow-hidden rounded-md`}
          justify="start"
        >
          {remoteScreenStream && (
            <ReactPlayer
              url={remoteScreenStream as MediaStream}
              playing={true}
              height="100%"
              width="100%"
              muted={true}
            />
          )}
        </Flex>
        <div
          className={`${
            isChatOpen ? "block" : " invisible"
          } border-2 col-span-1 border-myprimary p-2 rounded-md h-[98vh]`}
        >
          <Chat to={peer.user as UserType} user={user as UserType} />
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import ChatInput from "../ChatInput";
import ChatText from "./ChatText";
import { UserContext } from "../layouts/UserPageLayout";
import { ChatType } from "@/types/chat.types";
import useFetchUser from "@/hooks/useFetchUser";
import { listChatService } from "@/services/char.service";
import { createChatId } from "@/utils/createChatId";
import { useSocket } from "@/context/SocketContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Modal from "../ui/Modal";
import { useRouter } from "next/navigation";
import PeerService from "@/services/peer.service";

export default function Chat() {
  const to = useContext(UserContext);
  const { user } = useSelector((state: RootState) => state.user);
  const [chats, setChats] = useState<ChatType[]>([]);
  const socket = useSocket();
  const chatDivRef = useRef<HTMLDivElement | null>(null);
  const chatId = createChatId(to?.id as string, user?.id as string);
  const [newChats, setNewChats] = useState(false);
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
      const answer = await PeerService.getAnswear(remoteDescription);
      socket?.emit("call-accepted", { room: currentRoom, answer });
    }
    router.push(`/interview-room/${currentRoom}`);
  };
  const onReject = () => {
    setShowRequestModal(false);
    socket?.emit("request-declined", { room: currentRoom });
  };
  useEffect(() => {
    socket?.emit("join-room", { chatId });
    socket?.on(`${chatId}`, (data) => {
      setChats([...chats, data]);
      setNewChats(true);
    });
    socket?.on("interview-start-request", handleInterviewRequest);

    return () => {
      socket?.off(chatId);
      socket?.off("interview-start-request");
    };
  }, [chatId, socket, setChats, chats]);
  useEffect(() => {
    if (chatDivRef.current) {
      chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
      setNewChats(false);
    }
  }, [newChats]);
  useEffect(() => {
    const fetchChats = async () => {
      const res = await listChatService(to?.id as string);
      setChats([...res]);
      setNewChats(true);
    };
    if (to?.id) fetchChats();
  }, [to, chatDivRef.current]);

  return (
    <div className="  flex flex-col gap-5 h-screen md:h-[500px] px-2 w-full">
      <div className=" h-[95%] overflow-y-scroll " ref={chatDivRef}>
        {chats.map((chat, ind) => (
          <ChatText
            key={chat.id}
            text={chat.text}
            image={chat.fromUser?.image as string}
            isMe={user?.id == chat.from ? true : false}
            isLast={ind == chats.length - 1 || chat.from != chats[ind + 1].from}
            id={chat.id}
            time={chat.createdAt}
          />
        ))}
      </div>

      <ChatInput />
      <Modal
        isOpen={showRequestModal}
        title={"Incoming Call"}
        descripton="You got the interview call accept to continue with the interview."
        onAccept={onAccept}
        onClose={onReject}
      />
    </div>
  );
}

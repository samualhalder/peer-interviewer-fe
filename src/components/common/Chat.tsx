"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatInput from "../ChatInput";
import ChatText from "./ChatText";
import { ChatType } from "@/types/chat.types";
import { listChatService } from "@/services/char.service";
import { createChatId } from "@/utils/createChatId";
import { useSocket } from "@/context/SocketContext";
import { UserType } from "@/types/entity.types";

type propsType = {
  to: UserType;
  user: UserType;
};
export default function Chat(props: propsType) {
  const to = props.to;
  const user = props.user;
  const [chats, setChats] = useState<ChatType[]>([]);
  const socket = useSocket();
  const chatDivRef = useRef<HTMLDivElement | null>(null);
  const chatId = createChatId(to?.id as string, user?.id as string);
  const [newChats, setNewChats] = useState(false);

  useEffect(() => {
    socket?.emit("join-room", { chatId });
    socket?.on(`${chatId}`, (data) => {
      setChats([...chats, data]);
      setNewChats(true);
    });

    return () => {
      socket?.off(chatId);
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

      <ChatInput to={to} />
    </div>
  );
}

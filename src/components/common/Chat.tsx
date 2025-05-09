"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import ChatInput from "../ChatInput";
import ChatText from "./ChatText";
import { useSocket } from "@/utils/socket";
import { UserContext } from "../layouts/UserPageLayout";
import { ChatType } from "@/types/chat.types";
import useFetchUser from "@/hooks/useFetchUser";
import { listChatService } from "@/services/char.service";

export default function Chat() {
  const to = useContext(UserContext);
  const { user } = useFetchUser();
  const [chats, setChats] = useState<ChatType[]>([]);
  const socket = useSocket();
  const chatDivRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    socket?.on("connect", () => {
      console.log("connect to the socket");
    });
    socket?.on("get-socketId", (id: any) => {
      console.log("my socket id is ", id);
    });
    return () => {
      socket?.off("connect");
      socket?.off("get-socket-id");
    };
  }, []);
  useEffect(() => {
    const fetchChats = async () => {
      const res = await listChatService(to?.id as string);
      setChats([...res]);
    };
    if (to?.id) fetchChats();
  }, [to]);

  return (
    <div className="  flex flex-col gap-5 h-screen md:h-[400px] px-2 w-full">
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

      <ChatInput setChats={setChats} chats={chats} chatDivRef={chatDivRef} />
    </div>
  );
}

import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";

import Button from "./ui/Button";
import { sendChatService } from "@/services/char.service";

import { createChatId } from "@/utils/createChatId";
import { UserType } from "@/types/entity.types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSocket } from "@/context/SocketContext";

export default function ChatInput({ to }: { to: UserType }) {
  const socket = useSocket();
  const { user } = useSelector((state: RootState) => state.user);
  const [text, settext] = useState("");
  const chatId = createChatId(to?.id as string, user?.id as string);
  const handleSend = async () => {
    if (text.length == 0) return;
    // setChats([
    //   ...chats,
    //   {
    //     chatId: chatId,
    //     from: user?.id,
    //     to: to?.id as string,
    //     text: text,
    //     createdAt: new Date(),
    //     fromUser: user as UserType,
    //     toUser: to as UserType,
    //   },
    // ]);
    const res = await sendChatService({ to: to?.id, text: text });

    if (res.success) {
      settext("");
      socket?.emit(`message`, {
        chatId: chatId,
        from: user?.id,
        to: to?.id as string,
        text: text,
        createdAt: new Date(),
        fromUser: user as UserType,
        toUser: to as UserType,
      });
    } else {
    }
  };
  return (
    <div className="relative w-full">
      <textarea
        placeholder="Say Hello........."
        className=" resize-none block  w-full p-2 border-2 rounded-md border-gray-400 ring-gray-400 focus:outline-myprimary "
        rows={2}
        onChange={(e) => settext(e.target.value)}
        value={text}
      />
      <Button className="absolute bottom-1 right-1" onClick={handleSend}>
        <IoSendSharp />
      </Button>
    </div>
  );
}

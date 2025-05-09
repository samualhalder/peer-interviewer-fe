import React, { useContext, useState } from "react";
import Flex from "./ui/Flex";
import { IoSendSharp } from "react-icons/io5";

import Button from "./ui/Button";
import { sendChatService } from "@/services/char.service";
import { UserContext } from "./layouts/UserPageLayout";
import { ChatType } from "@/types/chat.types";
import useFetchUser from "@/hooks/useFetchUser";
import { createChatId } from "@/utils/createChatId";
import { UserType } from "@/types/entity.types";

export default function ChatInput({
  setChats,
  chats,
  chatDivRef,
}: {
  setChats: React.Dispatch<React.SetStateAction<ChatType[]>>;
  chats: ChatType[];
  chatDivRef: React.RefObject<HTMLDivElement | null>;
}) {
  const to = useContext(UserContext);
  const { user } = useFetchUser();
  const [text, settext] = useState("");
  const handleSend = async () => {
    if (text.length == 0) return;
    setChats([
      ...chats,
      {
        chatId: createChatId(to?.id as string, user?.id as string),
        from: user?.id,
        to: to?.id as string,
        text: text,
        createdAt: new Date(),
        fromUser: user as UserType,
        toUser: to as UserType,
      },
    ]);
    console.log("snd", chats);

    const res = await sendChatService({ to: to?.id, text: text });

    if (res.success) {
      settext("");
      if (chatDivRef.current)
        chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
    } else {
    }
  };
  return (
    <Flex
      variant="row"
      justify="start"
      items="center"
      className="relative bottom-1"
    >
      <textarea
        placeholder="Say Hello........."
        className=" resize-none w-full p-2 border-2 rounded-md border-gray-400 ring-gray-400 focus:outline-myprimary"
        rows={2}
        onChange={(e) => settext(e.target.value)}
        value={text}
      />
      <Button className=" absolute bottom-1 right-1" onClick={handleSend}>
        <IoSendSharp />
      </Button>
    </Flex>
  );
}

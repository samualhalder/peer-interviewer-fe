import React from "react";
import Flex from "./ui/Flex";
import { IoSendSharp } from "react-icons/io5";

import Button from "./ui/Button";

export default function ChatInput() {
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
      />
      <Button className=" absolute bottom-1 right-1">
        <IoSendSharp />
      </Button>
    </Flex>
  );
}

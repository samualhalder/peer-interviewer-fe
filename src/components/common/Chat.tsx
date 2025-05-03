import React from "react";
import ChatInput from "../ChatInput";
import Break from "./Break";
import ChatText from "./ChatText";
const dummyChatArray = [
  {
    id: "1",
    text: "Hey! How's it going?",
    time: new Date(),
    isMe: true,
    image: undefined,
    isLast: true,
  },
  {
    id: "2",
    text: "I'm doing great! Just finished a project.",
    time: new Date(),
    isMe: false,
    image: undefined,
    isLast: true,
  },
  {
    id: "3",
    text: "Awesome! What was it about?",
    time: new Date(),
    isMe: true,
    image: undefined,
    isLast: true,
  },
  {
    id: "4",
    text: "Built a simple chat UI with React.",
    time: new Date(),
    isMe: false,
    image: undefined,
    isLast: true,
  },
  {
    id: "5",
    text: "That's cool! Got a link to the project?",
    time: new Date(),
    isMe: true,
    image: undefined,
    isLast: true,
  },
  {
    id: "6",
    text: "Sure! Here it is: https://github.com/example/chat-ui",
    time: new Date(),
    isMe: false,
    image: undefined,
    isLast: true,
  },
  {
    id: "7",
    text: "Looks neat! I'll check it out later.",
    time: new Date(),
    isMe: true,
    image: undefined,
    isLast: false,
  },
  {
    id: "8",
    text: "By the way, did you see the latest AI news?",
    time: new Date(),
    isMe: true,
    image: undefined,
    isLast: true,
  },
  {
    id: "9",
    text: "Nope! What's happening?",
    time: new Date(),
    isMe: false,
    image: undefined,
    isLast: false,
  },
  {
    id: "10",
    text: "AI just beat humans at a creative writing contest!",
    time: new Date(),
    isMe: false,
    image: undefined,
    isLast: true,
  },
  {
    id: "11",
    text: "Woah, that's both awesome and kinda scary!",
    time: new Date(),
    isMe: true,
    image: undefined,
    isLast: true,
  },
  {
    id: "12",
    text: "Haha, yeah! Who knows what's next?",
    time: new Date(),
    isMe: false,
    image: undefined,
    isLast: true,
  },
];

export default function Chat() {
  return (
    <div className="  flex flex-col gap-5 h-screen md:h-[400px] px-2 w-full">
      <div className=" h-[95%] overflow-y-scroll ">
        {dummyChatArray.map((chat) => (
          <ChatText
            key={chat.id}
            image={chat.image}
            text={chat.text}
            isMe={chat.isMe}
            isLast={chat.isLast}
            id={chat.id}
            time={chat.time}
          />
        ))}
      </div>

      <ChatInput />
    </div>
  );
}

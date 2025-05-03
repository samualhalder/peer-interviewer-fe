import clsx from "clsx";
import moment from "moment";
import React from "react";
import ImageCircle from "./ImageCircle";
type propType = {
  id?: string;
  text: string;
  time: Date;
  isMe: boolean;
  image?: string;
  isLast: boolean;
};

export default function ChatText(props: propType) {
  return (
    <div
      className={clsx("flex mt-1 mb-1 items-end gap-2", {
        "justify-end": props.isMe,
      })}
    >
      {props.isLast && !props.isMe && (
        <ImageCircle link={props.image} width={40} height={40} />
      )}
      <div
        className={clsx(" relative px-4 py-2 text-white rounded-xl", {
          "bg-myprimary": props.isMe,
          "bg-mysecondary": !props.isMe,
          "mr-[48px]": !props.isLast && props.isMe,
          "ml-[48px]": !props.isLast && !props.isMe,
          " rounded-br-none": props.isLast && props.isMe,
          " rounded-bl-none": props.isLast && !props.isMe,
        })}
      >
        <p>{props.text}</p>
        <div className="flex justify-end">
          <p className="text-sm">{moment(props.time).format("HH:MM")}</p>
        </div>
      </div>
      {props.isLast && props.isMe && (
        <ImageCircle link={props.image} width={40} height={40} />
      )}
    </div>
  );
}

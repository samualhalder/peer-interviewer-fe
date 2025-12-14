import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function ImageCircle({
  width = 20,
  height = 20,
  link,
}: {
  width?: number;
  height?: number;
  link?: string;
}) {
  return (
    <>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        className=" relative rounded-full overflow-hidden border-mysecondary border-2 flex items-center justify-center"
      >
        {link ? (
          <Image
            src={`${link}?timestamp=${new Date().getTime()}`}
            alt="image"
            fill
            className=" object-cover"
          />
        ) : (
          <FaUserCircle size={width} color="" />
        )}
      </div>
    </>
  );
}

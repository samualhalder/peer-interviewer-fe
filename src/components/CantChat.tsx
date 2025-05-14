import React from "react";
import { FaCloudMoonRain } from "react-icons/fa";

export default function CantChat() {
  return (
    <div className="  flex flex-col justify-center items-center gap-5 h-screen md:h-[400px] px-2 w-full text-red-500 text-2xl">
      <FaCloudMoonRain size={100} />
      You cant chat until there is a accepted request between you.
    </div>
  );
}

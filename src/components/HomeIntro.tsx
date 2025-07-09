import React from "react";
import { Montserrat } from "next/font/google";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export default function HomeIntro() {
  return (
    <div className="">
      <div>
        <h1
          className={`text-white text-6xl font-semibold ${montserratFont.className}`}
        >
          Peer Interviewer
        </h1>
        <p className="text-mysecondary text-xl">
          find peers <MdKeyboardDoubleArrowRight className="inline" />
          send request <MdKeyboardDoubleArrowRight className="inline" />
          give interview
        </p>
      </div>
    </div>
  );
}

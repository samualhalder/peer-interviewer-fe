"use client";
import React from "react";
import { ReactNode } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Button from "@/components/ui/Button";
import Image from "next/image";
import TokenUtils from "@/utils/token.utils";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";

const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

function HomeBg() {
  return (
    <div className="">
      <HomeBackGround>
        <HomeLeft />
        <HomeRight />
      </HomeBackGround>
    </div>
  );
}

function HomeBackGround({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full bg-white flex items-center justify-between gap-2 md:flex-row flex-col ">
      {/* <div className="relative h-full w-full bg-white"> */}
      <div>
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1.5px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
      {children}
      {/* </div> */}
    </div>
  );
}

function HomeLeft() {
  const token = TokenUtils?.getToken();
  const router = useRouter();
  return (
    <div className="flex gap-4 flex-col items-start">
      <div
        className={`text-6xl text-gray-800 font-bold ${montserratFont.className} animate-bounce-twice`}
      >
        <p>Peer</p>
        <p>Interviewer</p>
      </div>
      <p className="text-xl">
        find peers <MdKeyboardDoubleArrowRight className="inline" />
        send request <MdKeyboardDoubleArrowRight className="inline" />
        give interview
      </p>
      <div className="flex w-full gap-2 items-center">
        {token ? (
          <Button variant="secondary" onClick={() => router.push("/requests")}>
            Upcoming Interview
          </Button>
        ) : (
          <Button onClick={() => router.push("/signin")}>Login</Button>
        )}
      </div>
    </div>
  );
}

function HomeRight() {
  return (
    <div className="h-[500px] flex gap-2 p-4">
      <div className="flex items-end">
        <div className="w-[200px] h-[200px] relative overflow-hidden shadow-xl border-[1.5px] border-gray-500  rounded-md">
          <Image
            src={"/images/intv-2.png"}
            fill
            className=" object-cover"
            alt="show"
          ></Image>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[150px] h-[150px] relative overflow-hidden shadow-xl border-[1.5px] border-gray-500  rounded-md">
          <Image
            src={"/images/intv-3.png"}
            fill
            className=" object-cover"
            alt="show"
          ></Image>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[300px] h-[300px] relative overflow-hidden shadow-2xl border-[1.5px] border-gray-500 rounded-md">
          <Image
            src={"/images/intv-4.png"}
            fill
            className=" object-cover"
            alt="show"
          ></Image>
        </div>
      </div>
    </div>
  );
}

export default HomeBg;

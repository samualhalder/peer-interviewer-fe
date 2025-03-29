"use client";
import React from "react";
import { Montserrat } from "next/font/google";
import { IoIosNotificationsOutline, IoIosSearch } from "react-icons/io";
import ls from "../../lib/localStorage";
import Button from "../ui/Button";

import Link from "next/link";

const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const token = ls.get("token") as string;

  return (
    <div className="w-[95%] h-[60px] fixed top-4 bg-primary text-white self-center rounded-md flex items-center px-3 justify-between">
      <Title />
      <SearchBar />
      <div className="flex gap-4">
        <NotificationIcon />
        {token ? (
          <Avatar />
        ) : (
          <Link href={"/signup"}>
            {" "}
            <Button variant="outline">Sign Up</Button>{" "}
          </Link>
        )}
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className={` tracking-widest text-2xl ${montserratFont.className}`}>
      peerInterviewer
    </div>
  );
}

function Avatar() {
  return (
    <div
      className={` h-[40px] w-[40px]  rounded-full overflow-hidden flex items-center justify-center ${montserratFont.className} font-bold border-[1.5px] border-white cursor-pointer`}
    >
      SH
    </div>
  );
}

function NotificationIcon() {
  return (
    <div
      className={`w-[40px] h-[40px] flex justify-center items-center hover:bg-blue-500 rounded-full cursor-pointer`}
    >
      <IoIosNotificationsOutline size={30} />
    </div>
  );
}

function SearchBar() {
  return (
    <div className={`flex justify-center items-center `}>
      <input
        type="text"
        name=""
        id=""
        className=" h-[40px] w-[350px] rounded-3xl text-primary px-5 outline-none"
      />
      <IoIosSearch
        size={30}
        className=" relative bg-white text-primary right-12 cursor-pointer"
      />
    </div>
  );
}

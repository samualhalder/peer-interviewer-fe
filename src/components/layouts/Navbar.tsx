"use client";
import React, { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { IoIosNotificationsOutline, IoIosSearch } from "react-icons/io";
import Button from "../ui/Button";

import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import TokenUtils from "@/utils/token.utils";
import DropDown from "../common/DropDown";
import { UserType } from "@/types/entity.types";
import useFetchUser from "@/hooks/useFetchUser";
import Image from "next/image";
import ImageCircle from "../common/ImageCircle";

const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const token = TokenUtils?.getToken();

  return (
    <>
      <div className="w-[95%] h-[60px] fixed top-4 bg-myprimary text-white self-center rounded-md flex items-center px-3 justify-between">
        <Title />
        <SearchBar />
        <div className="flex gap-4">
          <NotificationIcon />
          {token ? (
            <Avatar />
          ) : (
            <Link href={"/signin"}>
              {" "}
              <Button
                variant="outline"
                onClick={() => {
                  toast({
                    variant: "success",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                  });
                }}
              >
                Sign In
              </Button>{" "}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

function Title() {
  return (
    <div
      className={` tracking-widest text-2xl ${montserratFont.className} select-none`}
    >
      peerInterviewer
    </div>
  );
}

function Avatar() {
  const [isVissible, setIsVissible] = useState<boolean>(false);
  const { user } = useFetchUser();
  console.log(user);

  return (
    <div
      className={` h-[40px] w-[40px]  cursor-pointer select-none`}
      onClick={() => setIsVissible(!isVissible)}
    >
      <ImageCircle width={40} height={40} link={user?.image} />

      <DropDown isVissible={isVissible} setIsVissible={setIsVissible} />
    </div>
  );
}

function NotificationIcon() {
  return (
    <div
      className={`select-none w-[40px] h-[40px] flex justify-center items-center hover:bg-blue-500 rounded-full cursor-pointer`}
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

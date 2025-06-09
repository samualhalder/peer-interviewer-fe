"use client";
import React, { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { IoIosNotificationsOutline, IoIosSearch } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import Button from "../ui/Button";

import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import TokenUtils from "@/utils/token.utils";
import DropDown from "../common/DropDown";

import useFetchUser from "@/hooks/useFetchUser";

import ImageCircle from "../common/ImageCircle";
import { checkNewRequests } from "@/services/interviewRequest.service";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { set } from "@/redux/requestsSlice";

const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const token = TokenUtils?.getToken();

  return (
    <>
      <div className="w-[95%] h-[60px] fixed top-4 bg-myprimary text-white self-center rounded-md flex items-center px-3 justify-between z-50">
        <Title />
        <SearchBar />
        <div className="flex gap-4">
          <Requests />
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
    <Link
      href={"/"}
      className={` tracking-widest text-2xl ${montserratFont.className} select-none`}
    >
      peerInterviewer
    </Link>
  );
}

function Avatar() {
  const [isVissible, setIsVissible] = useState<boolean>(false);
  const { user } = useFetchUser();

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
  const [searchTerm, setsearchTerm] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    window.location.href = `/users/${encodeURIComponent(searchTerm)}`;
  };
  return (
    <form
      className={`flex justify-center items-center overflow-hidden`}
      onSubmit={(e) => handleSearch(e)}
    >
      <input
        type="text"
        name=""
        id=""
        placeholder="serch for a user"
        onChange={(e) => setsearchTerm(e.target.value)}
        className=" h-[40px] w-[350px] rounded-3xl text-primary px-5 outline-none"
      />

      <IoIosSearch
        size={30}
        className=" relative bg-white text-primary right-12 cursor-pointer"
      />
    </form>
  );
}

function Requests() {
  const { isNewRequests } = useSelector((state: RootState) => state.requests);
  const { user } = useFetchUser();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchIsNewRequests = async () => {
      const res = await checkNewRequests();
      dispatch(set(res));
    };
    fetchIsNewRequests();
  }, []);
  return (
    <Link
      href={`/requests/${user?.id}`}
      className={`relative select-none w-[40px] h-[40px] flex justify-center items-center hover:bg-blue-500 rounded-full cursor-pointer`}
    >
      {isNewRequests > 0 && (
        <div className="w-2 h-2 bg-red-600 rounded absolute top-1 right-1"></div>
      )}
      <FaUserFriends size={30} />
    </Link>
  );
}

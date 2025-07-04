"use client";
import React, { useContext, useEffect, useState } from "react";
import Flex from "./ui/Flex";
import ImageCircle from "./common/ImageCircle";

import { UserContext } from "./layouts/UserPageLayout";
import Button from "./ui/Button";
import { GoOrganization, GoLocation, GoHeart } from "react-icons/go";
import { IoSendSharp, IoHeartDislike, IoHeart } from "react-icons/io5";
import { MdCancelScheduleSend } from "react-icons/md";
import {
  followService,
  isFollowingService,
  unFollowService,
} from "../services/follow.service";
import {
  isSentService,
  sendService,
  unsendService,
} from "@/services/interviewRequest.service";
import StartInterview from "./StartInterview";

export default function UserPageLeft() {
  const to = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSent, setIsSent] = useState(false);
  useEffect(() => {
    const checkFollowing = async (id: string) => {
      const res = await isFollowingService(id);
      setIsFollowing(res);
    };
    const checkSend = async (id: string) => {
      const res = await isSentService(id);
      setIsSent(res);
    };

    if (to?.id) checkFollowing(to?.id);
    if (to?.id) checkSend(to.id);
  }, [to?.id]);

  return (
    <div className="md:col-span-1 rounded-md md:h-[100%] bg-gradient-to-br from-myprimary  to-mysecondary">
      <Flex gap="sm" className="py-5 px-2">
        <ImageCircle width={280} height={280} link={to?.image} />
        <Flex items="start" className="p-5" gap="md">
          <p className="text-4xl text-white font-semibold">{to?.name}</p>
          <Flex variant="row" justify="start">
            <p className="text-white font-medium">
              followers {to?.noOfFollowers}
            </p>
            <p className="text-white font-medium">
              following {to?.noOfFollowings}
            </p>
          </Flex>
          <p className="text-xl text-white font-medium flex gap-2 items-center">
            <GoOrganization />
            {to?.organization || "----"}
          </p>
          <p className="text-xl text-white font-medium flex gap-2 items-center">
            <GoLocation />
            {to?.location || "----"}
          </p>
          {!isFollowing ? (
            <Button
              className="w-[100%] flex items-center justify-center gap-3"
              onClick={() => {
                followService({ followed: to?.id });
                setIsFollowing(true);
              }}
            >
              <IoHeart fontSize={25} />
              Follow
            </Button>
          ) : (
            <Button
              className="w-full flex items-center justify-center gap-3"
              onClick={() => {
                unFollowService({ followed: to?.id });
                setIsFollowing(false);
              }}
            >
              <IoHeartDislike fontSize={25} />
              Unfollow
            </Button>
          )}
          {!isSent ? (
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-3"
              onClick={() => {
                sendService({ to: to?.id });
                setIsSent(true);
              }}
            >
              <IoSendSharp fontSize={25} />
              Sent Request For Interview
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-3"
              onClick={() => {
                unsendService({ to: to?.id });
                setIsSent(false);
              }}
            >
              <MdCancelScheduleSend fontSize={25} color="red" />
              Remove Request For Interview
            </Button>
          )}
          <StartInterview />
        </Flex>
      </Flex>
    </div>
  );
}

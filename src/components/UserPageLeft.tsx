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

export default function UserPageLeft() {
  const user = useContext(UserContext);
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
    if (user?.id) checkFollowing(user?.id);
    if (user?.id) checkSend(user.id);
  }, [user?.id]);
  return (
    <div className="md:col-span-1 rounded-md md:h-screen bg-gradient-to-br from-myprimary  to-mysecondary">
      <Flex gap="2xl" className="py-5 px-2">
        <ImageCircle width={280} height={280} link={user?.image} />
        <Flex items="start" className="p-5" gap="xl">
          <p className="text-4xl text-white font-semibold">{user?.name}</p>
          <Flex variant="row" justify="start">
            <p className="text-white font-medium">
              followers {user?.noOfFollowers}
            </p>
            <p className="text-white font-medium">
              following {user?.noOfFollowings}
            </p>
          </Flex>
          <p className="text-xl text-white font-medium flex gap-2 items-center">
            <GoOrganization />
            {user?.organization}
          </p>
          <p className="text-xl text-white font-medium flex gap-2 items-center">
            <GoLocation />
            {user?.location}
          </p>
          {!isFollowing ? (
            <Button
              className="w-full flex items-center justify-center gap-3"
              onClick={() => {
                followService({ followed: user?.id });
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
                unFollowService({ followed: user?.id });
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
                sendService({ to: user?.id });
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
                unsendService({ to: user?.id });
                setIsSent(false);
              }}
            >
              <MdCancelScheduleSend fontSize={25} color="red" />
              Remove Request For Interview
            </Button>
          )}
        </Flex>
      </Flex>
    </div>
  );
}

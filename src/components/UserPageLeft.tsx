"use client";
import React, { useContext } from "react";
import Flex from "./ui/Flex";
import ImageCircle from "./common/ImageCircle";

import { UserContext } from "./layouts/UserPageLayout";
import Button from "./ui/Button";
import { GoOrganization, GoLocation, GoHeart } from "react-icons/go";
import { IoSendSharp } from "react-icons/io5";

export default function UserPageLeft() {
  const user = useContext(UserContext);

  return (
    <div className="md:col-span-1 rounded-md md:h-screen bg-gradient-to-br from-myprimary  to-mysecondary">
      <Flex gap="2xl" className="py-5 px-2">
        <ImageCircle width={280} height={280} link={user?.image} />
        <Flex items="start" className="p-5" gap="xl">
          <p className="text-4xl text-white font-semibold">{user?.name}</p>
          <p className="text-xl text-white font-medium flex gap-2 items-center">
            <GoOrganization />
            {user?.organization}
          </p>
          <p className="text-xl text-white font-medium flex gap-2 items-center">
            <GoLocation />
            {user?.location}
          </p>
          <Button className="w-full flex items-center justify-center gap-3">
            <GoHeart fontSize={25} />
            Follow
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-3"
          >
            <IoSendSharp fontSize={25} />
            Sent Request For Interview
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}

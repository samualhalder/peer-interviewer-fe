"use client";
import React, { useContext, useEffect, useState } from "react";

import Break from "./common/Break";
import ProfileCard from "./common/ProfileCard";

import Flex from "./ui/Flex";
import ShowSkills from "./ShowSkills";
import { UserContext } from "./layouts/UserPageLayout";
import Chat from "./common/Chat";
import { canChatService } from "@/services/interviewRequest.service";
import CantChat from "./CantChat";

export default function UserPageRight() {
  const user = useContext(UserContext);
  const [canChat, setcanChat] = useState(false);
  useEffect(() => {
    const checkCanChat = async (id: string) => {
      const res = await canChatService(id);
      setcanChat(res);
    };

    if (user?.id) checkCanChat(user.id);
  }, [user?.id]);

  return (
    <>
      <Flex
        gap="xl"
        className="md:col-span-2 p-2 rounded-md md:h-[100%]"
        items="center"
        justify="between"
      >
        <Flex variant="row" items="center" justify="between">
          <ProfileCard
            color={{ from: "#006A4E", to: "#32de84" }}
            data={{ name: "Total Interviews Given", value: 2 }}
          />
          <ProfileCard
            color={{ from: "#00308F", to: "#7CB9E8" }}
            data={{ name: "Total Interviews Taken", value: 2 }}
          />
          <ProfileCard
            color={{ from: "#FEBE10", to: "#FFD700" }}
            data={{ name: "Upcoming Interviews", value: 2 }}
          />
          <ProfileCard
            color={{ from: "#FF033E", to: "#fd5c63" }}
            data={{ name: "Canceled Interviews", value: 2 }}
          />
        </Flex>
        <Flex items="start" className="">
          <ShowSkills skills={user?.skills} />
          <Break color="#025AE0" />
        </Flex>
        {canChat ? <Chat /> : <CantChat />}
      </Flex>
    </>
  );
}

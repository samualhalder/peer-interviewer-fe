"use client";
import React, { useContext, useEffect, useState } from "react";

import Break from "./common/Break";
import ProfileCard from "./common/ProfileCard";

import Flex from "./ui/Flex";
import ShowSkills from "./ShowSkills";
import { UserContext } from "./layouts/UserPageLayout";
import Chat from "./common/Chat";
import {
  canChatService,
  intStatsService,
} from "@/services/interviewRequest.service";
import CantChat from "./CantChat";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { UserType } from "@/types/entity.types";

export default function UserPageRight() {
  const to = useContext(UserContext);
  const { user } = useSelector((state: RootState) => state.user);
  const [canChat, setcanChat] = useState(false);
  useEffect(() => {
    const checkCanChat = async (id: string) => {
      const res = await canChatService(id);
      setcanChat(res);
    };

    if (to?.id) checkCanChat(to.id);
  }, [to?.id]);

  const [intStats, setIntStats] = useState({
    intTaken: 0,
    intGiven: 0,
    upcommings: 0,
    canceled: 0,
  });
  useEffect(() => {
    const fetchStats = async (id: string) => {
      const res = await intStatsService(id);
      setIntStats({
        intTaken: res?.intTaken,
        intGiven: res.intGiven,
        upcommings: res?.upcommings,
        canceled: res?.canceled,
      });
    };
    if (to?.id) fetchStats(to.id);
  }, [to?.id]);

  return (
    <>
      <Flex
        gap="xl"
        className="md:col-span-2 p-2 rounded-md md:h-full"
        items="center"
        justify="between"
      >
        <Flex variant="row" items="center" justify="between">
          <ProfileCard
            color={{ from: "#006A4E", to: "#32de84" }}
            data={{ name: "Total Interviews Given", value: intStats.intGiven }}
          />
          <ProfileCard
            color={{ from: "#00308F", to: "#7CB9E8" }}
            data={{ name: "Total Interviews Taken", value: intStats.intTaken }}
          />
          <ProfileCard
            color={{ from: "#FEBE10", to: "#FFD700" }}
            data={{ name: "Upcoming Interviews", value: intStats.upcommings }}
          />
          <ProfileCard
            color={{ from: "#FF033E", to: "#fd5c63" }}
            data={{ name: "Canceled Interviews", value: intStats.canceled }}
          />
        </Flex>
        <Flex items="start" className="">
          <ShowSkills skills={to?.skills} />
          <Break color="#025AE0" />
        </Flex>
        {canChat ? (
          <div className="max-h-[75%] min-h-[75%] w-full">
            <Chat to={to as UserType} user={user as UserType} />
          </div>
        ) : (
          <CantChat />
        )}
      </Flex>
    </>
  );
}

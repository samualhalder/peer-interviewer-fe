"use client";
import React from "react";
import Flex from "../ui/Flex";
import ProfileCard from "./ProfileCard";
import TechnicalSkills from "../TechnicalSkills";
import Break from "./Break";
import ResetPassword from "../ResetPassword";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import useFetchIntStatas from "@/hooks/useFetchIntStats";

export default function ProfileRight() {
  const { user } = useSelector((state: RootState) => state.user);
  const intStats = useFetchIntStatas(user?.id as string);
  return (
    <Flex
      gap="3xl"
      className="md:col-span-2 p-2 rounded-md h-screen "
      items="center"
      justify="start"
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
          color={{ to: "#FFEF76", from: "#FFD700" }}
          data={{ name: "Upcoming Interviews", value: intStats.upcommings }}
        />
        <ProfileCard
          color={{ from: "#FF033E", to: "#fd5c63" }}
          data={{ name: "Canceled Interviews", value: intStats.canceled }}
        />
      </Flex>
      <Flex items="start" className="">
        <TechnicalSkills />

        <Break color="blue" />
        <ResetPassword />
      </Flex>
    </Flex>
  );
}

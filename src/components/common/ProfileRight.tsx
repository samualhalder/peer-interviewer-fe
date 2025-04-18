import React from "react";
import Flex from "../ui/Flex";
import ProfileCard from "./ProfileCard";
import TechnicalSkills from "../TechnicalSkills";
import Break from "./Break";
import ResetPassword from "../ResetPassword";


export default function ProfileRight() {
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
        <TechnicalSkills />

        <Break color="blue" />
        <ResetPassword />
      </Flex>
    </Flex>
  );
}

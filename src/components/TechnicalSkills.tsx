import React from "react";
import Flex from "./ui/Flex";
import { IoAddCircleSharp } from "react-icons/io5";

export default function TechnicalSkills() {
  return (
    <Flex items="start">
      <Flex variant="row" items="center" justify="start">
        <IoAddCircleSharp size={30} />
        <h1 className="text-xl font-semibold">Add Technical Skills</h1>
      </Flex>
    </Flex>
  );
}

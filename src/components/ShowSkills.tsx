import React from "react";
import Pill from "./Pills";

export default function ShowSkills({ skills = "" }: { skills?: string }) {
  const skillsArrey = skills?.split(",");
  return (
    <div className="relative flex gap-2 flex-wrap -z-10">
      {skillsArrey.map((skill, ind) => (
        <Pill value={skill} key={ind} />
      ))}
    </div>
  );
}

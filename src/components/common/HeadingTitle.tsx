import React from "react";
import Flex from "../ui/Flex";

type propType = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  icon: React.ReactNode;
};
export default function HeadingTitle({ title, icon, ...props }: propType) {
  return (
    <div {...props}>
      <Flex
        variant="row"
        items="center"
        justify="start"
        className="text-myprimary"
      >
        {icon}
        <h1 className="text-xl font-semibold">{title}</h1>
      </Flex>
    </div>
  );
}

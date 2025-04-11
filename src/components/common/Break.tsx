import { cn } from "../../utils/cn";
import React from "react";

type propType = {
  size?: number;
  className?: string;
  color?: string;
};
export default function Break({
  size = 1,
  color = "white",
  className,
}: propType) {
  return (
    <div
      style={{
        height: `${size}px`,
        width: "100%",
        backgroundColor: `${color}`,
      }}
      className={cn(className, "my-6 bg-myprimary")}
    ></div>
  );
}

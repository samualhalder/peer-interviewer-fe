import clsx from "clsx";
import React from "react";

type propType = {
  size?: number;
  className?: string;
};
export default function Break({ size = 1, className }: propType) {
  return (
    <div
      style={{
        height: `${size}px`,
        width: "100%",
      }}
      className={clsx("bg-white", className)}
    ></div>
  );
}

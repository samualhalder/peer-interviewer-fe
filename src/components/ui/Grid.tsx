import React from "react";

type propType = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};
export default function Grid({ children, ...props }: propType) {
  return (
    <div
      className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-2"
      {...props}
    >
      {children}
    </div>
  );
}

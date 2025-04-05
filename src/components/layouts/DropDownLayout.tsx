import React from "react";

export default function DropDownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-myprimary absolute top-[62px] right-[1%] w-[300px] p-5 rounded-md shadow-md flex flex-col gap-2">
      {children}
    </div>
  );
}

import Link from "next/link";
import React from "react";

export default function DropDownItem({
  icon,
  title,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  action?: () => void;
}) {
  return (
    <>
      {" "}
      <div
        className="flex gap-4 items-center hover:bg-mysecondary p-2 rounded-md "
        onClick={action}
      >
        {icon}
        {title}
      </div>
    </>
  );
}

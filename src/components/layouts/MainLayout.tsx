import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-[70px] p-4">{children}</div>;
}

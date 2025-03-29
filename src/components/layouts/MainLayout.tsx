import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-[62px] p-4">{children}</div>;
}

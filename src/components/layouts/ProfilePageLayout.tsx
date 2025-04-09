import React from "react";

export default function ProfilePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-2 grid md:grid-cols-3 gap-2">{children}</div>;
}

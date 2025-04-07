import React from "react";

export default function ProfilePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-2 flex flex-col md:flex-row gap-2 h-screen">
      {children}
    </div>
  );
}

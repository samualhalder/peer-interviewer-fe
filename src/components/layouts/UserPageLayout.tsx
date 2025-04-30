"use client";
import { useGetUserById } from "@/hooks/useGetUserById";
import { UserType } from "@/types/entity.types";
import React, { createContext } from "react";

export const UserContext = createContext<UserType | null>(null);
export default function UserPageLayout({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const { user } = useGetUserById(id);
  return (
    <div className="p-2 grid md:grid-cols-3 gap-2 ">
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </div>
  );
}

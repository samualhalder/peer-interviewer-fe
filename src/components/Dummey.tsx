"use client";
import { useGetUserById } from "@/hooks/useGetUserById";
import React from "react";

export default function Dummey({ id }: { id: string }) {
  const { user } = useGetUserById(id);
  console.log("iss", user);

  return <></>;
}

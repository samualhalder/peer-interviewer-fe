"use client";
import useFetchUser from "@/hooks/useFetchUser";
import React from "react";
import ImageCircle from "./ImageCircle";
import Flex from "../ui/Flex";
import LeftProfileForm from "@/forms/LeftProfileForm";

export default function ProfileLeft() {
  const { user } = useFetchUser();
  return (
    <div className="md:col-span-1 rounded-md md:h-screen bg-gradient-to-br from-myprimary  to-mysecondary">
      <Flex gap="2xl" className="py-5 px-2">
        <ImageCircle width={200} height={200} link={user?.image} />
        <LeftProfileForm />
      </Flex>
    </div>
  );
}

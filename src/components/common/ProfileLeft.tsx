"use client";
import useFetchUser from "@/hooks/useFetchUser";
import React from "react";
import ImageCircle from "./ImageCircle";
import Flex from "../ui/Flex";
import LeftProfileForm from "@/forms/LeftProfileForm";
import ImageUpload from "./ImageUpload";

export default function ProfileLeft() {
  const { user, setuser } = useFetchUser();
  return (
    <div className="md:col-span-1 rounded-md md:h-screen bg-mysecondary">
      <Flex gap="2xl" className="py-5 px-2">
        <ImageCircle width={200} height={200} link={user?.image} />
        <ImageUpload setUser={setuser}/>
        <LeftProfileForm />
      </Flex>
    </div>
  );
}

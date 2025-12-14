"use client";
import useFetchUser from "@/hooks/useFetchUser";
import React, { useState } from "react";
import ImageCircle from "./ImageCircle";
import Flex from "../ui/Flex";
import LeftProfileForm from "@/forms/LeftProfileForm";
import ImageUpload from "./ImageUpload";

export default function ProfileLeft() {
  const { user, setuser } = useFetchUser();
  const [showImgModal, setShowImgModal] = useState(false);
  return (
    <div className="md:col-span-1 rounded-md md:h-screen bg-mysecondary">
      <Flex gap="2xl" className="py-5 px-2">
        <div
          onDoubleClick={() => setShowImgModal(!showImgModal)}
          className="relative inline-block cursor-pointer group"
        >
          <ImageCircle width={200} height={200} link={user?.image} />
          <div
            className="absolute inset-0 flex items-center justify-center 
                  bg-black/50 text-white text-sm font-medium
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-200
                  rounded-full text-center"
          >
            {" "}
            Double click to update image
          </div>
        </div>
        <ImageUpload
          setUser={setuser}
          isOpen={showImgModal}
          onClose={() => setShowImgModal(false)}
        />
        <LeftProfileForm />
      </Flex>
    </div>
  );
}

"use client";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase";
import { oAuhtService } from "../../services/auth.service";
import { useRouter } from "next/navigation";

export default function GoogleAuth() {
  const router = useRouter();
  const auth = getAuth(app);
  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      await oAuhtService({
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex justify-center select-none">
      <div
        className=" border-2 border-white rounded-sm flex mt-2 w-[250px] h-[40px] cursor-pointer group"
        onClick={handleClick}
      >
        <div className="bg-white w-[15%] flex items-center justify-center">
          <FcGoogle size={25} />
        </div>
        <div className="flex items-center justify-around text-white font-medium  group-hover:bg-mysecondary">
          <span className=" ml-2">Continue With Google</span>
        </div>
      </div>
    </div>
  );
}

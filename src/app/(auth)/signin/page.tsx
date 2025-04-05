"use client";
import AuthCardLayout from "@/components/layouts/AuthCardLayout";
import React, { useEffect } from "react";
import SignInForm from "./SignInForm";
import { checkValidToken } from "../../../services/auth.service";
export default function Page() {
  useEffect(() => {
    const ck = async () => {
      const res = await checkValidToken();
      console.log("rs", res);

      return res;
    };
    console.log("ck", ck());
  }, []);
  return (
    <>
      <AuthCardLayout>
        <div className="text-white text-5xl mx-auto ">Sign In</div>
        <SignInForm />
      </AuthCardLayout>
    </>
  );
}

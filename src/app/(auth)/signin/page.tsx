"use client";
import AuthCardLayout from "@/components/layouts/AuthCardLayout";
import React, { useEffect } from "react";
import SignInForm from "./SignInForm";
import { checkValidToken } from "../../../services/auth.service";
import Break from "@/components/common/Break";
import GoogleAuth from "@/components/common/GoogleAuth";
export default function Page() {
  useEffect(() => {
    const ck = async () => {
      const res = await checkValidToken();

      return res;
    };
  }, []);
  return (
    <>
      <AuthCardLayout>
        <div className="text-white text-5xl mx-auto ">Sign In</div>
        <SignInForm />
        <Break className="mt-4" />
        <GoogleAuth />
      </AuthCardLayout>
    </>
  );
}

"use client";
import AuthCardLayout from "@/components/layouts/AuthCardLayout";
import React from "react";
import SignInForm from "./SignInForm";
import Break from "@/components/common/Break";
import GoogleAuth from "@/components/common/GoogleAuth";
export default function Page() {
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

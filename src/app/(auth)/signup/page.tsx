"use client";
import AuthCardLayout from "@/components/layouts/AuthCardLayout";

import React from "react";
import SignUpForm from "./SignUpForm";
import Break from "@/components/common/Break";
import GoogleAuth from "@/components/common/GoogleAuth";

export default function Page() {
  return (
    <AuthCardLayout>
      <div className="text-white text-5xl mx-auto ">Sign Up</div>
      <SignUpForm />
      <Break className="mt-2" />
      <GoogleAuth />
    </AuthCardLayout>
  );
}

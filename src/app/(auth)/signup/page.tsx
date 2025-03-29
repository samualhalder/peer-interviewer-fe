"use client";
import AuthCardLayout from "@/components/layouts/AuthCardLayout";

import React from "react";
import SignUpForm from "./SignUpForm";

export default function Page() {
  return (
    <AuthCardLayout>
      <div className="text-white text-5xl mx-auto ">Sign Up</div>
      <SignUpForm />
    </AuthCardLayout>
  );
}

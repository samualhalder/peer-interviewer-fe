import AuthCardLayout from "@/components/layouts/AuthCardLayout";
import React from "react";
import SignInForm from "./SignInForm";

export default function Page() {
  return (
    <>
      <AuthCardLayout>
        <div className="text-white text-5xl mx-auto ">Sign In</div>
        <SignInForm />
      </AuthCardLayout>
    </>
  );
}

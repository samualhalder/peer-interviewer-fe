"use client";
import React from "react";
import { Toaster } from "./ui/toaster";
import Navbar from "./layouts/Navbar";
import MainLayout from "./layouts/MainLayout";
import { usePathname } from "next/navigation";
import CatchIntRequest from "./CatchIntRequest";
import Footer from "./Footer";

export default function Paths({ children }: { children: React.ReactNode }) {
  const noNavbarPaths = [
    "/signup",
    "/signin",
    "/interview-room/*",
    "/forgot-password",
  ];
  const pathname = usePathname();
  return (
    <>
      {noNavbarPaths.includes(pathname) ||
      pathname.startsWith("/interview-room") ? (
        <div className="h-screen flex justify-center items-center">
          {children}
          <Toaster />
        </div>
      ) : (
        <>
          {" "}
          <Navbar />
          <CatchIntRequest />
          <MainLayout>{children}</MainLayout>
          <Footer />
          <Toaster />
        </>
      )}
    </>
  );
}

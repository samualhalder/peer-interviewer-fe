"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import TokenUtils from "@/utils/token.utils";
import { checkValidToken } from "../services/auth.service";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const token = TokenUtils?.getToken() as string;

  const publicPaths = ["/signin", "/signup"];

  useEffect(() => {
    setIsCheckingAuth(true);
    const fun = async () => {
      setIsCheckingAuth(true);
      const res = await checkValidToken(token);

      if (!res && !publicPaths.includes(pathname)) {
        router.push("/signin");
      }
      if (res && publicPaths.includes(pathname)) router.push("/");
      setIsCheckingAuth(false);
    };
    fun();
  }, [token]);

  return isCheckingAuth ? null : children;
};

export default AuthGuard;

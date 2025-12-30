"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import TokenUtils from "@/utils/token.utils";

import { removeUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { isTokenExpired } from "@/lib/utils";
import tokenUtils from "@/utils/token.utils";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const token = TokenUtils?.getToken() as string;

  useEffect(() => {
    console.log("loaded auth gaurd");
    const publicPaths = [
      "/signin",
      "/signup",
      "/",
      "/forgot-password",
      "/reset-password",
    ];
    const fun = async () => {
      setIsCheckingAuth(true);
      if (isTokenExpired(token)) {
        tokenUtils?.removeToken();
        dispatch(removeUser());
        TokenUtils?.removeToken();
        if (!publicPaths.includes(pathname)) router.push("/signin");
      } else {
        // dispatch(setUser(user));
      }
      // const res = await checkValidToken(token);

      // if (!res && !publicPaths.includes(pathname)) {
      //   dispatch(removeUser());
      //   TokenUtils?.removeToken();
      //   router.push("/signin");
      // }
      // if (res && publicPaths.includes(pathname)) {
      //   router.push("/");
      // }
      // if (res && !publicPaths.includes(pathname)) {
      //   dispatch(setUser(user));
      // }
      setIsCheckingAuth(false);
    };
    fun();
  }, [token, dispatch, router, pathname]);

  return isCheckingAuth ? null : children;
};

export default AuthGuard;

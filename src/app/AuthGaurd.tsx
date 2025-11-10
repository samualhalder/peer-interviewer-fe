"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import TokenUtils from "@/utils/token.utils";
import { checkValidToken } from "../services/auth.service";
import useFetchUser from "@/hooks/useFetchUser";
import { setUser, removeUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const token = TokenUtils?.getToken() as string;
  const { user } = useFetchUser();

  useEffect(() => {
    const publicPaths = ["/signin", "/signup", "/"];
    const fun = async () => {
      setIsCheckingAuth(true);
      const res = await checkValidToken(token);

      if (!res && !publicPaths.includes(pathname)) {
        dispatch(removeUser());
        router.push("/signin");
      }
      if (res && publicPaths.includes(pathname)) {
        router.push("/");
      }
      if (res && !publicPaths.includes(pathname)) {
        dispatch(setUser(user));
      }
      setIsCheckingAuth(false);
    };
    fun();
  }, [token, user, dispatch, router, pathname]);

  return isCheckingAuth ? null : children;
};

export default AuthGuard;

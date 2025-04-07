"use client";
import { useEffect, useState } from "react";
import { fetchUser } from "../services/auth.service";
import { UserType } from "@/types/entity.types";
export default function useFetchUser() {
  const [user, setuser] = useState<UserType | null>(null);
  useEffect(() => {
    const fetchUserFuntion = async () => {
      const result = await fetchUser();
      setuser({ ...result });
    };
    fetchUserFuntion();
  }, []);
  return { user };
}

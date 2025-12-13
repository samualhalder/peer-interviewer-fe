"use client";
import { useEffect, useState } from "react";
import { fetchUser } from "../services/auth.service";
import { UserType } from "@/types/entity.types";
export default function useFetchUser() {
  const [user, setuser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchUserFuntion = async () => {
      setLoading(true);
      const result = await fetchUser();
      setuser({ ...result });
      setLoading(false);
    };
    fetchUserFuntion();
  }, []);
  return { user, loading };
}

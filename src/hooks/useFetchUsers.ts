import { getUsersService } from "@/services/auth.service";
import { UserType } from "@/types/entity.types";
import { useEffect, useState } from "react";

const useFetchUsers = (search: string) => {
  const [users, setusers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUserFuntion = async () => {
      setLoading(true);
      const result = await getUsersService(search);
      setusers([...result]);
      setLoading(false);
    };
    fetchUserFuntion();
  }, [search]);
  return { users, loading };
};

export default useFetchUsers;

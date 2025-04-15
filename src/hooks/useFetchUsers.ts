import { getUsersService } from "@/services/auth.service";
import { UserType } from "@/types/entity.types";
import { useEffect, useState } from "react";

const useFetchUsers = (search: string) => {
  const [users, setusers] = useState<UserType[]>([]);
  useEffect(() => {
    const fetchUserFuntion = async () => {
      const result = await getUsersService(search);
      setusers([...result]);
    };
    fetchUserFuntion();
  }, [search]);
  return { users };
};

export default useFetchUsers;

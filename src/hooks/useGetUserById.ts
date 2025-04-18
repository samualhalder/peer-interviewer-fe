import { getUsersByIdService } from "@/services/auth.service";
import { UserType } from "@/types/entity.types";
import { useEffect, useState } from "react";

const useGetUserById = (id: string) => {
  const [user, setuser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUserFuntion = async () => {
      const result = await getUsersByIdService(id);
      setuser({ ...result });
    };
    fetchUserFuntion();
  }, []);
  return { user };
};
export { useGetUserById };

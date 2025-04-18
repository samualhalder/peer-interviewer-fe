import { useGetUserById } from "@/hooks/useGetUserById";
import { UserType } from "@/types/entity.types";
import React, { createContext } from "react";

const userContext = createContext<UserType | null>(null);

const useProvider = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { user } = useGetUserById(id);
};

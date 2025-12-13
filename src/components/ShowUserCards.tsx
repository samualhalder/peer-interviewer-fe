"use client";
import useFetchUsers from "@/hooks/useFetchUsers";
import React from "react";
import Flex from "./ui/Flex";
import UserCard from "./UserCard";
import NoResult from "./NoResult";
import { LoadingComp } from "./LoadingComp";

export default function ShowUserCards({ search }: { search: string }) {
  const { users, loading } = useFetchUsers(search);
  if (loading) {
    return <LoadingComp />;
  }
  return (
    <Flex variant="wrap" justify="start" gap="lg">
      {users.length > 0 ? (
        users.map((user) => <UserCard user={user} key={user.id} />)
      ) : (
        <NoResult />
      )}
    </Flex>
  );
}

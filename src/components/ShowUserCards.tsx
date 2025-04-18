"use client";
import useFetchUsers from "@/hooks/useFetchUsers";
import React from "react";
import Flex from "./ui/Flex";
import UserCard from "./UserCard";

export default function ShowUserCards({ search }: { search: string }) {
  const { users } = useFetchUsers(search);

  return (
    <Flex variant="wrap" justify="start" gap="lg">
      {users.length &&
        users.map((user) => <UserCard user={user} key={user.id} />)}
    </Flex>
  );
}

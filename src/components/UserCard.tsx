"use client";
import React from "react";
import Flex from "./ui/Flex";
import ImageCircle from "./common/ImageCircle";
import Button from "./ui/Button";
import { UserType } from "@/types/entity.types";
import { useRouter } from "next/navigation";

export default function UserCard({ user }: { user: UserType }) {
  const router = useRouter();

  return (
    <Flex
      className=" shadow-lg w-[200px] h-[300px] rounded-lg py-5 px-3 hover:border-[1px] hover:border-myprimary"
      justify="around"
    >
      <ImageCircle width={130} height={130} link={user.image} />
      <p>{user.name}</p>
      <Button onClick={() => router.push(`/user/${user.id}`)}>
        View Profile
      </Button>
    </Flex>
  );
}

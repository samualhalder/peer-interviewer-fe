import Dummey from "@/components/Dummey";
import ProfilePageLayout from "@/components/layouts/ProfilePageLayout";
import UserPageLayout from "@/components/layouts/UserPageLayout";
import UserPageLeft from "@/components/UserPageLeft";
import UserPageRight from "@/components/UserPageRight";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <UserPageLayout id={id}>
      <UserPageLeft />
      <UserPageRight />
    </UserPageLayout>
  );
}

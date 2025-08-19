import UserPageLayout from "@/components/layouts/UserPageLayout";
import UserPageLeft from "@/components/UserPageLeft";
import UserPageRight from "@/components/UserPageRight";
import { getUsersByIdService } from "@/services/auth.service";
import { Metadata } from "next";
import React from "react";

type PropType = {
  params: { id: string };
};
export const generateMetadata = async ({
  params,
}: PropType): Promise<Metadata> => {
  const { id } = params;
  const user = await getUsersByIdService(id);
  console.log("ud mt", user);

  return {
    title: `Profile | ${user?.name}`,
  };
};

export default async function Page({ params }: PropType) {
  const { id } = params;

  return (
    <UserPageLayout id={id}>
      <UserPageLeft />
      <UserPageRight />
    </UserPageLayout>
  );
}

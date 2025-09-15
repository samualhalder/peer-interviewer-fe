import UserPageLayout from "@/components/layouts/UserPageLayout";
import UserPageLeft from "@/components/UserPageLeft";
import UserPageRight from "@/components/UserPageRight";
import { getUsersByIdService } from "@/services/auth.service";
import { Metadata } from "next";
import React from "react";

// type PageProps = {
//   params: { id: string };
// };
export const generateMetadata = async (props: any): Promise<Metadata> => {
  const { id } = props.params as { id: string };
  const user = await getUsersByIdService(id);

  return {
    title: `Profile | ${user?.name}`,
  };
};

export default async function Page(props: any) {
  const { id } = props.params as { id: string };

  return (
    <UserPageLayout id={id}>
      <UserPageLeft />
      <UserPageRight />
    </UserPageLayout>
  );
}

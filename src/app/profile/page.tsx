import ProfileLeft from "@/components/common/ProfileLeft";
import ProfileRight from "@/components/common/ProfileRight";
import ProfilePageLayout from "@/components/layouts/ProfilePageLayout";
import React from "react";
export const metadata = {
  title: "Profile",
  description: "Give interview among peers",
};
export default function Page() {
  return (
    <ProfilePageLayout>
      <ProfileLeft />
      <ProfileRight />
    </ProfilePageLayout>
  );
}

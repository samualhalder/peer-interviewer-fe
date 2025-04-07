import ProfileLeft from "@/components/common/ProfileLeft";
import ProfileRight from "@/components/common/ProfileRight";
import ProfilePageLayout from "@/components/layouts/ProfilePageLayout";
import React from "react";

export default function Page() {
  return (
    <ProfilePageLayout>
      <ProfileLeft />
      <ProfileRight />
    </ProfilePageLayout>
  );
}

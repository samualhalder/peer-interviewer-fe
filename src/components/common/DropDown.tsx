"use client";
import React from "react";
import DropDownLayout from "../layouts/DropDownLayout";
import DropDownItem from "./DropDownItem";
import {
  AiOutlineUser,
  AiOutlineLogin,
  AiOutlineSetting,
  AiOutlineCustomerService,
} from "react-icons/ai";
import { signOutService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Break from "./Break";

function DropDown({ isVissible = false }: { isVissible: boolean }) {
  const router = useRouter();
  if (!isVissible) return null;
  return (
    <DropDownLayout>
      <DropDownItem icon={<AiOutlineUser />} title="Profile" />
      <DropDownItem icon={<AiOutlineSetting />} title="Settings" />
      <DropDownItem
        icon={<AiOutlineCustomerService />}
        title="Feedback & Support"
      />
      <Break size={1} />
      <DropDownItem
        icon={<AiOutlineLogin />}
        title="Sign Out"
        action={() => {
          signOutService();
          router.push("/signin");
        }}
      />
    </DropDownLayout>
  );
}
// Adding a static property

export default DropDown;

"use client";
import React, { Dispatch, SetStateAction, useRef } from "react";
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
import useOutSideClick from "@/hooks/useOutSideClick";

function DropDown({
  isVissible = false,
  setIsVissible,
}: {
  isVissible: boolean;
  setIsVissible: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  useOutSideClick(ref, () => setIsVissible(false), isVissible);
  if (!isVissible) return null;
  return (
    <div className="z-50">
      <DropDownLayout ref={ref}>
        <DropDownItem
          icon={<AiOutlineUser />}
          title="Profile"
          action={() => router.push("/profile")}
        />
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
    </div>
  );
}
// Adding a static property

export default DropDown;

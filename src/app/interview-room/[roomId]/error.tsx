"use client";
import ErrorComp from "@/components/common/ErrorComp";
import { useRouter } from "next/navigation";
import React, { startTransition } from "react";

export default function Error({ reset }: { reset: () => void }) {
  const router = useRouter();
  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };
  return (
    <>
      <ErrorComp reload={reload} />
    </>
  );
}

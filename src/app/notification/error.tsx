"use client";
import ErrorComp from "@/components/common/ErrorComp";
import { useRouter } from "next/navigation";
import React, { startTransition } from "react";

export default function ErrorBoundary({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const reload = () => {
    startTransition(() => {
      router.refresh();
      window.location.reload();

      reset();
    });
  };
  return (
    <div>
      <ErrorComp reload={reload} />
    </div>
  );
}

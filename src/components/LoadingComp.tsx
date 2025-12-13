import React from "react";
import { Spinner } from "./ui/spinner";

export const LoadingComp = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Spinner className="size-10 text-myprimary" />
    </div>
  );
};

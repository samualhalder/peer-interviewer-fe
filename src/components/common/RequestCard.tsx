"use client";
import { InterviewRequestsType } from "@/types/request.types";
import React, { useContext } from "react";
import ImageCircle from "./ImageCircle";
import Button from "../ui/Button";
import moment from "moment";
import Link from "next/link";
import {
  acceptService,
  rejectService,
} from "@/services/interviewRequest.service";
import clsx from "clsx";
import { TabContext } from "@/app/requests/[id]/page";

export default function RequestCard({
  request,
}: {
  request: InterviewRequestsType;
}) {
  const { currentTab } = useContext(TabContext);
  const user = currentTab == 0 ? request.fromuser : request.touser;
  return (
    <div
      className={`w-full px-4 py-2 shadow-lg rounded-md
      } ${request.status ? " bg-gray-200" : ""}`}
    >
      <div className="grid grid-cols-4">
        <div className=" col-span-1 flex justify-center items-center ">
          <ImageCircle link={user?.image} width={60} height={60} />
        </div>
        <div className="col-span-2">
          <Link href={`/user/${user.id}`} className="font-semibold text-lg ">
            {user?.name}
          </Link>
          <p>{user?.email}</p>
          <p className="text-[12px] text-gray-500">
            {moment(request.createdAt).fromNow()}
          </p>
        </div>
        <div
          className={clsx(
            "col-span-1 flex gap-2",
            request.status && " invisible",
            currentTab == 1 && "invisible"
          )}
        >
          <Button onClick={() => acceptService(request.id)}>Accept</Button>
          <Button variant="outline" onClick={() => rejectService(request.id)}>
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}

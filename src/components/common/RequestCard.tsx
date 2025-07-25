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
import { TabContext } from "@/app/requests/page";
import { useDispatch } from "react-redux";
import { remove } from "@/redux/requestsSlice";
import { useRouter } from "next/navigation";

export default function RequestCard({
  request,
}: {
  request: InterviewRequestsType;
}) {
  const { currentTab } = useContext(TabContext);
  const router=useRouter()
  const dispatch = useDispatch();
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
          className={clsx("col-span-1 flex gap-2", {
            invisible: request.status !== "pending" || currentTab === 1,
          })}
        >
          <Button
            onClick={() => {
                router.push(`/user/${request.from}`)
              acceptService(request.id);
              dispatch(remove());
            }}
          >
            Accept
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              rejectService(request.id);
              dispatch(remove());
            }}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}

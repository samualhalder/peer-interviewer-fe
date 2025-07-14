"use client";

import React from "react";

import moment from "moment";
import Link from "next/link";

import { NotificationsTypes } from "@/types/notification.types";
import { IoNotifications } from "react-icons/io5";
import { seenNotificationService } from "@/services/notification.service";

export default function NotificationCard({
  notification,
}: {
  notification: NotificationsTypes;
}) {
    const handleClickNoticicaiton=async()=>{
        await seenNotificationService(notification.id)
        
    }

  return (
      <Link href={`${notification?.link}`} className="font-semibold text-lg " onClick={handleClickNoticicaiton}>
    <div
      className={`w-full md:w-[40%] px-4 py-2 shadow-lg rounded-md flex flex-col mx-auto gap-2
      } ${notification.seen ? " bg-gray-200" : ""}`}
    >
      <div className="grid grid-cols-3">
        <div className=" flex justify-center items-center col-span-1">
          <IoNotifications size={35}/>
        </div>
        <div className="col-span-2">

          <p>{notification.title}</p>
          <p className="text-sm text-gray-600">{notification.content}</p>
          <p className="text-[12px] text-gray-500">
            {moment(notification.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
          </Link>
  );
}

"use client";
import NotificationCard from "@/components/common/NotificationCard";
import { LoadingComp } from "@/components/LoadingComp";

import { set } from "@/redux/notificationSlice";
import { RootState } from "@/redux/store";

import { listNotificationService } from "@/services/notification.service";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchNotification = async () => {
      setLoading(true);
      const res = await listNotificationService();
      dispatch(set({ count: res.count, notifications: res.notifications }));
      setLoading(false);
    };
    fetchNotification();
  }, [dispatch]);
  if (loading) {
    return <LoadingComp />;
  }
  return (
    <div className="min-h-screen flex flex-col gap-4">
      {notifications?.map((notification) => (
        <NotificationCard notification={notification} key={notification.id} />
      ))}
      {notifications.length == 0 && (
        <div className=" text-xl ">No Notifications To Show</div>
      )}
    </div>
  );
}

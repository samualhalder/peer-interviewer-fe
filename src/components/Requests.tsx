"use client";
import React, { useState } from "react";
import PillFilter from "./common/PillFilter";
import { FilterFieldType } from "@/types/filter.types";
import { GoArrowUp, GoArrowDown, GoClockFill } from "react-icons/go";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import Break from "./common/Break";
import LoadRequests from "./common/LoadRequests";

export default function Requests() {
  const [status, setStatus] = useState("all");
  const [order, setOrder] = useState("desc");
  const data: FilterFieldType[] = [
    {
      name: "Latest",
      value: "desc",
      field: order,
      setField: setOrder,
      icon: <GoArrowUp />,
    },
    {
      name: "Oldest",
      value: "asc",
      field: order,
      setField: setOrder,
      icon: <GoArrowDown />,
    },
    {
      name: "Pending",
      value: "pending",
      field: status,
      setField: setStatus,
      icon: <GoClockFill />,
    },
    {
      name: "Accepted",
      value: "accepted",
      field: status,
      setField: setStatus,
      icon: <IoCheckmarkDoneOutline />,
    },
  ];

  return (
    <div className=" max-w-[700px] min-w-[300px] min-h-screen ">
      <PillFilter fields={data}></PillFilter>
      <Break color="#025AE0" />
      <LoadRequests status={status} order={order} />
    </div>
  );
}

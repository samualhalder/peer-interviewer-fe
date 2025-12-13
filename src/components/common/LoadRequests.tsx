import React, { useContext, useEffect, useState } from "react";
import { list, listSent } from "../../services/interviewRequest.service";
import { InterviewRequestsType } from "@/types/request.types";
import RequestCard from "./RequestCard";
import Flex from "../ui/Flex";
import { TabContext } from "@/context/TabContext";
import { LoadingComp } from "../LoadingComp";

export default function LoadRequests({
  order = "",
  status = "",
}: {
  order?: string;
  status?: string;
}) {
  const [requests, setRequests] = useState<InterviewRequestsType[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const { currentTab } = useContext(TabContext);
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const res = await list(order, status);
      setRequests([...res]);
      setLoading(false);
    };
    const fetchSent = async () => {
      setLoading(true);
      const res = await listSent(order, status);
      setRequests([...res]);
      setLoading(false);
    };
    if (currentTab == 0) fetchRequests();
    if (currentTab == 1) fetchSent();
  }, [order, status, currentTab]);
  if (loading) {
    return <LoadingComp />;
  }
  return (
    <Flex>
      {requests &&
        requests?.map((request, ind) => (
          <RequestCard request={request} key={ind} />
        ))}
    </Flex>
  );
}

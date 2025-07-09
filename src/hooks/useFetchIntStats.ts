"use client";
import { intStatsService } from "@/services/interviewRequest.service";
import { useEffect, useState } from "react";

export default function useFetchIntStatas(id: string) {
  const [intStats, setIntStats] = useState({
    intTaken: 0,
    intGiven: 0,
    upcommings: 0,
    canceled: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      const res = await intStatsService(id);
      setIntStats({
        intTaken: res?.intTaken,
        intGiven: res.intGiven,
        upcommings: res?.upcommings,
        canceled: res?.canceled,
      });
    };
    fetchStats();
  }, []);
  return intStats;
}

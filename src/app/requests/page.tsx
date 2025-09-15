"use client";
import Tab from "@/components/common/Tab";
import Requests from "@/components/Requests";
import Flex from "@/components/ui/Flex";
import { TabContext } from "@/context/TabContext";
import { TabType } from "@/types/tab.types";
import React, { useState } from "react";

export default function Page() {
  const [currentTab, setCurrentTab] = useState(0);
  const tabs: TabType[] = [
    {
      name: "Request Recived",
      index: 0,
    },
    {
      name: "Request Sent",
      index: 1,
    },
  ];

  return (
    <TabContext.Provider value={{ currentTab }}>
      <Flex justify="start" items="center" className="w-full">
        <Tab
          tabs={tabs}
          currentValue={currentTab}
          setCurrentValue={setCurrentTab}
        />
        <Requests />
      </Flex>
    </TabContext.Provider>
  );
}

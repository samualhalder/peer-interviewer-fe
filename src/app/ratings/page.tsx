"use client";
import Tab from "@/components/common/Tab";
import Ratings from "@/components/Ratings";

import Flex from "@/components/ui/Flex";
import { TabContext } from "@/context/TabContext";
import { TabType } from "@/types/tab.types";
import React, { useState } from "react";

export default function Page() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const tabs: TabType[] = [
    {
      name: "Give Rating",
      index: 0,
    },
    {
      name: "Ratings Given",
      index: 1,
    },
    {
      name: "Ratings Recived",
      index: 2,
    },
  ];

  return (
    <TabContext.Provider value={{ currentTab: currentTab }}>
      <Flex justify="start" items="center" className="w-full h-screen">
        <Tab
          tabs={tabs}
          currentValue={currentTab}
          setCurrentValue={setCurrentTab}
        />
        <Ratings />
      </Flex>
    </TabContext.Provider>
  );
}

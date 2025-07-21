"use client";
import Tab from "@/components/common/Tab";
import Ratings from "@/components/Ratings";

import Flex from "@/components/ui/Flex";
import { TabType } from "@/types/tab.types";
import React, { createContext, useState } from "react";

type RatingTabcontextType = {
  currentTab: number;
};
export const RatingsTabContext = createContext<RatingTabcontextType>({ currentTab: 0 });
export default function Page() {
  const [currentTab, setCurrentTab] = useState(0);
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
    <RatingsTabContext.Provider value={{ currentTab }}>
      <Flex justify="start" items="center" className="w-full">
        <Tab
          tabs={tabs}
          currentValue={currentTab}
          setCurrentValue={setCurrentTab}
        />
        <Ratings/>
      </Flex>
    </RatingsTabContext.Provider>
  );
}

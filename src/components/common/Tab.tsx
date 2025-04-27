import { TabType } from "@/types/tab.types";
import React from "react";
import Flex from "../ui/Flex";
import clsx from "clsx";

export default function Tab({
  currentValue,
  setCurrentValue,
  tabs,
}: {
  tabs: TabType[];
  currentValue: number;
  setCurrentValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="">
      <Flex variant="row" justify="between" items="start">
        {tabs.map((tab, ind) => (
          <Header
            key={ind}
            currentValue={currentValue}
            setCurrentValue={setCurrentValue}
            tab={tab}
          />
        ))}
      </Flex>
      <div>{tabs[currentValue]?.children}</div>
    </div>
  );
}

function Header({
  currentValue,
  tab,
  setCurrentValue,
}: {
  currentValue: number;
  tab: TabType;
  setCurrentValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center py-2 px-4 text-lg text-myprimary font-semibold",
        currentValue == tab.index && "border-b-2 border-myprimary"
      )}
      onClick={() => setCurrentValue(tab.index)}
    >
      {tab.name}
    </div>
  );
}

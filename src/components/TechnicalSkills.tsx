"use client";
import React, { useEffect, useRef, useState } from "react";
import Flex from "./ui/Flex";
import { IoAddCircleSharp } from "react-icons/io5";
import { techStacks } from "../lib/techStacks";
import { RxCross1 } from "react-icons/rx";
import Button from "./ui/Button";
import { leftProfileFormService } from "@/services/profile.service";
import useFetchUser from "@/hooks/useFetchUser";
import HeadingTitle from "./common/HeadingTitle";
import useOutSideClick from "@/hooks/useOutSideClick";

export default function TechnicalSkills() {
  return (
    <Flex items="start">
      <HeadingTitle
        title="Add Technical skills"
        icon={<IoAddCircleSharp size={40} />}
      />
      <Input />
    </Flex>
  );
}

const Input = () => {
  const { user } = useFetchUser();
  const [serchTerm, setSerchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [suggetions, setSuggetions] = useState<string[]>(techStacks);
  const [activeRow, setActiveRow] = useState(0);
  const suggetionRef = useRef<HTMLUListElement | null>(null);
  useOutSideClick(
    suggetionRef,
    () => setShowSuggestions(false),
    showSuggestions
  );
  useEffect(() => {
    const skills = user?.skills;
    let skillsArrey: string[] = [];
    if (skills) {
      skillsArrey = skills.split(",");
    }
    setSelectedItems([...skillsArrey]);
  }, [user]);
  const handleRemove = (item: string) => {
    setSelectedItems([...selectedItems.filter((elm) => elm != item)]);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSerchTerm(e.target.value);
    setShowSuggestions(true);
  };
  useEffect(() => {
    if (serchTerm.length == 0) setShowSuggestions(false);
    setSuggetions([
      ...techStacks.filter(
        (sg) =>
          sg.toLowerCase().startsWith(serchTerm) && !selectedItems.includes(sg)
      ),
    ]);
  }, [serchTerm, selectedItems]);
  const inputFef = useRef<HTMLInputElement | null>(null);
  const handleBackSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      serchTerm.length == 0 &&
      e.key == "Backspace" &&
      selectedItems.length > 0
    ) {
      setSelectedItems([...selectedItems.slice(0, -1)]);
    } else if (e.key === "ArrowDown" && suggetions.length > 0) {
      setActiveRow((pre) => (pre < suggetions.length - 1 ? pre + 1 : 0));
    } else if (e.key === "ArrowUp" && suggetions.length > 0) {
      setActiveRow((pre) => (pre > 0 ? pre - 1 : suggetions.length - 1));
    } else if (e.key === "Enter" && activeRow >= 0 && suggetions.length > 0) {
      setSelectedItems([...selectedItems, suggetions[activeRow]]);
      setShowSuggestions(false);
      setSerchTerm("");
      inputFef.current?.focus();
    }
  };

  const handleSave = async () => {
    const stringFromArrey = selectedItems.join(",");
    await leftProfileFormService({ skills: stringFromArrey });
  };

  return (
    <div className="w-full ">
      <div className="flex relative border-2 border-myprimary w-full rounded-sm p-2 ">
        <div className="flex  flex-wrap items-center justify-start gap-2 w-full ">
          {/* Serch Pill  */}
          {selectedItems?.map((it, ind) => (
            <Pill value={it} key={ind} onClick={() => handleRemove(it)}></Pill>
          ))}
          {/* Input Field */}
          <div className="relative">
            <input
              ref={inputFef}
              type="text"
              value={serchTerm}
              onChange={handleChange}
              placeholder="Search"
              onKeyDown={handleBackSpace}
              className="border-none focus:outline-none text-myprimary"
            />
            <ul
              ref={suggetionRef}
              hidden={!showSuggestions}
              className="absolute bg-white max-h-[300px] w-[400px] overflow-y-auto  top-10 left-2 rounded-md shadow-lg"
            >
              {suggetions.length > 0 ? (
                suggetions.map((st, ind) => (
                  <li
                    key={ind}
                    className={` px-4 py-2  cursor-pointer text-lg hover:bg-mysecondary hover:text-white ${
                      activeRow == ind && "bg-mysecondary text-white"
                    }`}
                    onClick={() => {
                      setSelectedItems([...selectedItems, st]);
                      setShowSuggestions(false);
                      setSerchTerm("");
                      inputFef.current?.focus();
                    }}
                  >
                    {st}
                  </li>
                ))
              ) : (
                <li className="p-2 text-mysecondary flex items-center justify-center">
                  No Data
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Button className="mt-2" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

const Pill = ({ value, onClick }: { value: string; onClick: () => void }) => {
  return (
    <div className="flex gap-2 items-center justify-between bg-mysecondary px-2 py-1 text-white rounded-sm shadow-md select-none ">
      {value}
      <RxCross1 onClick={onClick} />
    </div>
  );
};

"use client";
import React, { useEffect, useState } from "react";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import Button from "../ui/Button";

type rateType = {
  rate: number;
  selected: boolean;
};
export default function StarRating({
  setRate,
  review,
  setReview,
  onClick,
  rate,
  show = false, // it only shows the rating and review but dont allow to edit it
}: {
  setRate?: (rate: number) => void;
  rate: number;
  review?: string;
  setReview?: (review: string) => void;
  onClick?: () => void;
  show: boolean;
}) {
  const [starObj, SetStarObj] = useState<rateType[]>([
    {
      rate: 1,
      selected: false,
    },
    {
      rate: 2,
      selected: false,
    },
    {
      rate: 3,
      selected: false,
    },
    {
      rate: 4,
      selected: false,
    },
    {
      rate: 5,
      selected: false,
    },
  ]);

  const setStar = (rate: number) => {
    const newRatings: rateType[] = starObj.map((star: rateType) =>
      star.rate <= rate
        ? { rate: star.rate, selected: true }
        : { rate: star.rate, selected: false }
    );
    SetStarObj(newRatings);
    if (setRate) setRate(rate);
  };
  useEffect(() => {
    setStar(rate);
  }, [rate]);
  return (
    <div className="w-full">
      {/* stars */}
      <div className="flex gap-2 mb-2">
        {starObj.map((star: rateType) => (
          <div
            key={star.rate}
            onClick={() => {
              if (show) return;
              setStar(star.rate);
            }}
          >
            {star.selected ? (
              <IoStarSharp size={30} color="#FFE11B" />
            ) : (
              <IoStarOutline size={30} color="gray" />
            )}
          </div>
        ))}
      </div>
      {/* review writing section */}
      <div>
        {show ? (
          <p>{review}</p>
        ) : (
          <textarea
            name=""
            id=""
            rows={5}
            value={review}
            placeholder="write your thoughts on the interview"
            className="w-full border-2 border-myprimary p-2 rounded-md"
            onChange={(e) => {
              if (setReview) setReview(e.target.value);
            }}
          ></textarea>
        )}
      </div>
      {!show && <Button onClick={onClick}>Save</Button>}
    </div>
  );
}

import React from "react";
type propType = {
  color: {
    from: string;
    to: string;
  };
  data: {
    name: string;
    value: number;
  };
};

export default function ProfileCard({ color, data }: propType) {
  return (
    <div
      className={`p-2 text-white h-full w-full rounded-md shadow-lg`}
      style={{
        background: `linear-gradient(to bottom right, ${color.from}, ${color.to})`,
      }}
    >
      <p className="text-sm font-medium ">{data.name}</p>
      <p className="text-lg font-semibold">{data.value}</p>
    </div>
  );
}

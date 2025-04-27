import { FilterFieldType } from "@/types/filter.types";
import clsx from "clsx";
import React from "react";

export default function PillFilter({ fields }: { fields: FilterFieldType[] }) {
  return (
    <div className=" flex min-w-full px-3 py-2 gap-2 overflow-x-auto">
      {fields.map((field, ind) => (
        <Pill field={field} key={ind} />
      ))}
    </div>
  );
}

function Pill({ field }: { field: FilterFieldType }) {
  return (
    <div
      className={clsx(
        "flex gap-2 items-center justify-between bg-myprimary px-2 py-1 text-white rounded-sm shadow-md select-none",

        field.value == field.field && "bg-mysecondary text-blue-100"
      )}
      onClick={() => {
        if (field.field == field.value) {
          field.setField("");
        } else {
          field.setField(field.value);
        }
      }}
    >
      {field.name}
      {field.icon && field.icon}
    </div>
  );
}

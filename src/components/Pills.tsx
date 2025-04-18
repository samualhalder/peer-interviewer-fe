import React from "react";
import { RxCross1 } from "react-icons/rx";

const Pill = ({ value, onClick }: { value: string; onClick?: () => void }) => {
  return (
    <div className="flex gap-2 items-center justify-between bg-mysecondary px-2 py-1 text-white rounded-sm shadow-md select-none ">
      {value}
      {onClick && <RxCross1 onClick={onClick} />}
    </div>
  );
};
export default Pill;

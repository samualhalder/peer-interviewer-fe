import React, { forwardRef } from "react";

const DropDownLayout = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  return (
    <div
      ref={ref} // Attach the ref to the div element
      className="bg-myprimary absolute top-[62px] right-[1%] w-[300px] p-5 rounded-md shadow-md flex flex-col gap-2 "
    >
      {children}
    </div>
  );
});

DropDownLayout.displayName = "Display Layout";
export default DropDownLayout;

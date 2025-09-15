"use client";
import { createContext } from "react";

export type RatingTabcontextType = {
  currentTab: number;
};
export const TabContext = createContext<RatingTabcontextType>({
  currentTab: 0,
});

// const TabContextProvider=({children}:{children:React.ReactNode})=>{

//     return
// }

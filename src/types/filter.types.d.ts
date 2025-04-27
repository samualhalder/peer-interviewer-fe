import React from "react";
export interface FilterFieldType {
  name: string;
  value: string;
  field: string;
  setField: React.Dispatch<React.SetStateAction<T>>;
  icon?: React.ReactNode;
}

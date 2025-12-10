import { Field } from "formik";
import React, { ComponentProps } from "react";

type propType = ComponentProps<"input"> & {
  name: string;
  label?: string;
  as?: "input" | "select";
  errors: any;
  touched: any;
  labelText?: string;
};
export default function InputField({
  name,
  label,
  as = "input",
  errors,
  touched,
  labelText = "myprimary",
  ...props
}: propType) {
  return (
    <>
      <div className="flex flex-col gap-3">
        {label && (
          <label htmlFor={name} className={`font-medium text-${labelText} `}>
            {label}
          </label>
        )}
        <Field name={name} as={as} className="custom-input " {...props}  />

        {errors[name] && touched[name] && (
          <div className=" text-sm text-red-400">{errors[name]}</div>
        )}
      </div>
    </>
  );
}

import React from "react";
import HeadingTitle from "./common/HeadingTitle";
import { IoAddCircleSharp } from "react-icons/io5";

export default function AddDescription() {
  return (
    <>
      <HeadingTitle
        title="Add Description"
        icon={<IoAddCircleSharp size={40} />}
      />
      {/* <Formik
      initialValues={{
        'description':"",
        'organization':''
      }}

      ></Formik> */}
    </>
  );
}

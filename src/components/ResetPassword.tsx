"use client";
import {
  isPasswordSetService,
  resetpasswordService,
} from "@/services/auth.service";
import { resetPasswordValidatiaonSchema } from "@/validations/auth.validation";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { MdChangeCircle } from "react-icons/md";

import Grid from "./ui/Grid";
import HeadingTitle from "./common/HeadingTitle";

export default function ResetPassword() {
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  useEffect(() => {
    const fetchIsPasswordset = async () => {
      const res = await isPasswordSetService();
      setIsPasswordSet(res);
    };
    fetchIsPasswordset();
  }, []);
  return (
    <div className="w-full">
      <HeadingTitle
        title="Reset Your Password"
        icon={<MdChangeCircle size={40} />}
      />
      <Formik
        initialValues={{
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={resetPasswordValidatiaonSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          setSubmitting(true);
          const succ = await resetpasswordService(values);
          if (succ) resetForm();
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                errors={errors}
                touched={touched}
                name="newPassword"
                label="New Password*"
                as="input"
              />
              <InputField
                errors={errors}
                touched={touched}
                name="confirmPassword"
                label="Confirm Password*"
                as="input"
              />
            </div>
            <Button type="submit" className="mt-2">
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

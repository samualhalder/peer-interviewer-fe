"use client";
import { resetpasswordService } from "@/services/auth.service";
import { resetPasswordValidatiaonSchema } from "@/validations/auth.validation";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { MdChangeCircle } from "react-icons/md";

import Grid from "./ui/Grid";
import HeadingTitle from "./common/HeadingTitle";

export default function ResetPassword() {
  return (
    <div className="w-full">
      <HeadingTitle
        title="Reset Your Password"
        icon={<MdChangeCircle size={40} />}
      />
      <Formik
        initialValues={{
          currentPassword: "",
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
            <Grid>
              <InputField
                errors={errors}
                touched={touched}
                name="currentPassword"
                label="Current Password*"
                as="input"
              />
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
            </Grid>
            <Button type="submit" className="mt-2">
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

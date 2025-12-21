"use client";
import AuthCardLayout from "@/components/layouts/AuthCardLayout";
import Button from "@/components/ui/Button";

import InputField from "@/components/ui/InputField";
import { forgotPassword } from "@/services/auth.service";
import { forgotPasswordValidationSchema } from "@/validations/auth.validation";

import { Form, Formik } from "formik";

import React from "react";

function page() {
  return (
    <AuthCardLayout>
      <div className="h-full">
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={async (value, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            await forgotPassword({ email: value.email });
            setSubmitting(false);
            resetForm();
          }}
          validationSchema={forgotPasswordValidationSchema}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className=" flex flex-col gap-2 justify-center h-full items-center">
                <InputField
                  name="email"
                  placeholder="mail@xyz.com"
                  errors={errors}
                  touched={touched}
                  disabled={isSubmitting}
                  label="Email"
                  labelText="white"
                />
                <Button disabled={isSubmitting}>Send</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AuthCardLayout>
  );
}

export default page;

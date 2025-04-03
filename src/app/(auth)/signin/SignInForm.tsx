"use client";
import React from "react";
import { Field, Form, Formik } from "formik";
import Button from "@/components/ui/Button";
import { signinValidationSchema } from "@/validations/auth.validation";
import { signInService, signUpService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  return (
    <div className="mt-10">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (value, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const res = await signInService(value);
          setSubmitting(false);
          resetForm();
          if (res.success) {
            router.push("/");
          }
        }}
        validationSchema={signinValidationSchema}
        enableReinitialize={true}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="font-medium text-white ">
                  Email*
                </label>
                <Field
                  name="email"
                  as="input"
                  className="custom-input flex-grow "
                />

                {errors.email && touched.email && (
                  <div className=" text-sm text-red-400">{errors.email}</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-medium text-white">
                  Password*
                </label>
                <Field
                  name="password"
                  as="input"
                  className="custom-input flex-grow "
                />

                {errors.password && touched.password && (
                  <div className=" text-sm text-red-400">{errors.password}</div>
                )}
              </div>
              <Button
                className="w-full mt-5 border-white border-[1px]"
                variant="secondary"
                disabled={isSubmitting}
              >
                Sign In
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

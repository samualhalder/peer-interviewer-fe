import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "@/components/ui/Button";

export default function SignUpForm() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Enter your full name"),
    email: Yup.string().email("Valid email is required").required("Required"),
    password: Yup.string()
      .min(6, "Length must be at least 6")
      .required("Required"),
  });

  const handleSubmit = () => {};

  return (
    <div className="mt-10">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-3">
                <label htmlFor="name" className="font-medium text-white ">
                  Name*
                </label>
                <Field
                  name="name"
                  as="input"
                  className="custom-input flex-grow "
                />

                {errors.name && touched.name && (
                  <div className=" text-sm text-red-400">{errors.name}</div>
                )}
              </div>
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
              >
                Sign Up
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

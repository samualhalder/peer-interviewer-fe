import React from "react";
import { Field, Form, Formik } from "formik";

import Button from "@/components/ui/Button";
import { signupValidationSchema } from "@/validations/auth.validation";
import { signUpService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpForm() {
  const router = useRouter();
  return (
    <div className="mt-10">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={async (value, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const res = await signUpService(value);
          setSubmitting(false);
          resetForm();
          if (res.success) {
            router.push("/");
          }
        }}
        validationSchema={signupValidationSchema}
        enableReinitialize={true}
      >
        {({ errors, touched, isSubmitting }) => (
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
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <p className="mt-2 text-white">
        already have an account?{" "}
        <Link href={"/signin"} className="text-blue-950">
          sign in
        </Link>
      </p>
    </div>
  );
}

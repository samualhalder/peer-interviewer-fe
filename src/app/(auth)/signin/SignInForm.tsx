"use client";
import React from "react";
import { Form, Formik } from "formik";
import Button from "@/components/ui/Button";
import { signinValidationSchema } from "@/validations/auth.validation";
import { signInService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputField from "@/components/ui/InputField";

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
              <InputField
                name="email"
                errors={errors}
                touched={touched}
                as="input"
                label="Email*"
                labelText="white"
              />
              <InputField
                name="password"
                errors={errors}
                touched={touched}
                as="input"
                label="Password*"
                type="password"
                labelText="white"
              />
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
      <p className="mt-2 text-white">
        dont have an account?{" "}
        <Link href={"/signup"} className="text-blue-950">
          sign up
        </Link>
      </p>
    </div>
  );
}

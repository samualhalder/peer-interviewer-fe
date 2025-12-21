"use client";
import React from "react";
import { Form, Formik } from "formik";
import Button from "@/components/ui/Button";
import { signinValidationSchema } from "@/validations/auth.validation";
import { signInService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputField from "@/components/ui/InputField";
import { Spinner } from "@/components/ui/spinner";

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
          if (res.success) {
            router.push("/");
            resetForm();
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
                placeholder="example@gamail.com"
              />
              <InputField
                name="password"
                errors={errors}
                touched={touched}
                as="input"
                label="Password*"
                type="password"
                labelText="white"
                placeholder="password"
              />
              <Link href={"/forgot-password"} className="text-white italic">
                forgot password?
              </Link>
              <Button
                className="w-full mt-5 border-white border-[1px]"
                variant="secondary"
                disabled={isSubmitting}
              >
                {!isSubmitting ? (
                  "Sign In"
                ) : (
                  <span className="flex items-center justify-around">
                    <Spinner />
                  </span>
                )}
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

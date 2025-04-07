import React from "react";
import { Field, Form, Formik } from "formik";

import Button from "@/components/ui/Button";
import { signupValidationSchema } from "@/validations/auth.validation";
import { signUpService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputField from "@/components/ui/InputField";

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
              <InputField
                name="name"
                errors={errors}
                touched={touched}
                as="input"
                label="Full Name*"
                placeholder="John Dow"
              />
              <InputField
                name="email"
                errors={errors}
                touched={touched}
                as="input"
                label="Email*"
                placeholder="example@gmail.com"
              />
              <InputField
                name="password"
                errors={errors}
                touched={touched}
                as="input"
                label="Password*"
                type="password"
                placeholder="*******"
              />
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

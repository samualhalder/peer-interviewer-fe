"use client";
import { LoadingComp } from "@/components/LoadingComp";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { Spinner } from "@/components/ui/spinner";
import {
  resetForgotPasswordService,
  validateResetPasswordTokenService,
} from "@/services/auth.service";
import { resetForgotPasswordValidationSchema } from "@/validations/auth.validation";
import { Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const router = useRouter();
  const token = params.get("token");
  useEffect(() => {
    const func = async () => {
      setLoading(true);
      const res = await validateResetPasswordTokenService(token as string);
      if (!res) {
        setTokenExpired(true);
      }
      setLoading(false);
    };
    func();
  }, [token, router]);
  if (tokenExpired) {
    return <div>Sorry! the password reset session is expired try again</div>;
  }
  if (loading) {
    return <LoadingComp />;
  }
  return (
    <div>
      <Formik
        initialValues={{
          token: token as string,
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (value, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const res = await resetForgotPasswordService(value);
          setSubmitting(false);
          if (res) {
            resetForm();
            router.push("/signin");
          } else {
            router.push("/forgot-password");
          }
        }}
        validationSchema={resetForgotPasswordValidationSchema}
        enableReinitialize={true}
        validateOnChange
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="flex flex-col gap-2">
              <InputField
                name="password"
                errors={errors}
                touched={touched}
                as="input"
                label="Password*"
                type="password"
                placeholder="*******"
              />
              <InputField
                name="confirmPassword"
                errors={errors}
                touched={touched}
                as="input"
                label="Confirm Password*"
                type="password"
                placeholder="*******"
              />
              <Button
                className="w-full mt-5 border-white border-[1px]"
                variant="secondary"
                disabled={isSubmitting}
              >
                {!isSubmitting ? (
                  "Reset"
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
    </div>
  );
}

export default Page;

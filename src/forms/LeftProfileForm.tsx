import useFetchUser from "@/hooks/useFetchUser";
import { leftProfileFormValidation } from "@/validations/profile.validation";
import { Form, Formik } from "formik";
import { leftProfileFormService } from "../services/profile.service";
import React from "react";
import Flex from "@/components/ui/Flex";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

export default function LeftProfileForm() {
  const { user } = useFetchUser();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: user?.name,
        email: user?.email,
        image: user?.image || "",
        location: user?.location || "",
        organization: user?.organization || "",
      }}
      validationSchema={leftProfileFormValidation}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("form is subbmitng ", values);
        setSubmitting(true);
        await leftProfileFormService(values);
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form className="w-full">
          <Flex>
            <InputField
              name="name"
              label="Name*"
              errors={errors}
              touched={touched}
              labelText="white"
            />
            <InputField
              name="email"
              label="Email*"
              errors={errors}
              touched={touched}
              labelText="white"
              disabled
            />
            <InputField
              name="location"
              label="Locataion"
              labelText="white"
              errors={errors}
              touched={touched}
            />
            <InputField
              name="organization"
              label="Organization"
              labelText="white"
              errors={errors}
              touched={touched}
            />
            <Button type="submit">Save</Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

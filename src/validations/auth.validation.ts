import * as Yup from "yup";
export const signupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Enter your full name"),
  email: Yup.string()
    .email("Valid email is required")
    .required("Email is Required"),
  password: Yup.string()
    .min(6, "Length must be at least 6")
    .required("Password is Required"),
});
export const signinValidationSchema = Yup.object().shape({
  email: Yup.string().email("Valid email is required").required("Required"),
  password: Yup.string()
    .min(6, "Length must be at least 6")
    .required("Required"),
});

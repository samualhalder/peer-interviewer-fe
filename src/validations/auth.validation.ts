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

export const resetPasswordValidatiaonSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current Password is required"),
  newPassword: Yup.string().required("New Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf(
      [Yup.ref("newPassword")],
      "Confirm password must match to new password field"
    ),
});

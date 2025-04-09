import * as Yup from "yup";

export const leftProfileFormValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  image: Yup.string().required("Image is required"),
  location: Yup.string().required("locaton is required"),
});

import * as Yup from "yup"

export const validationSchema = {
  name: Yup.string().required("Name is required").min(2, "Min value 2"),
  email: Yup.string().email("Email not correct").required("Email required"),
  password: Yup.string()
    .required("Password is reuired")
    .min(8, "At least 8 characters")
    .matches(/(.*[A-Z].*)/, "At least one letter in CAPS.")
    .matches(/(.*[0-9].*)/, "At least one number")
    .matches(/[!@#$%^&*(),.?':{}|<>]/, "At least one (non alphanumeric) symbol"),
  prePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
}

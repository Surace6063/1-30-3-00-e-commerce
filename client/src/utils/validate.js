
import * as yup from "yup";

export const registerFormValidationSchema = yup.object({
  first_name: yup
    .string()
    .required("First name is required")
    .min(2, "At least 2 characters")
    .max(30, "Too long")
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
    .trim(),

  last_name: yup
    .string()
    .required("Last name is required")
    .min(2, "At least 2 characters")
    .max(30, "Too long")
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
    .trim(),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .trim(),

    username: yup
    .string()
    .required("Username is required")
    .trim(),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Must be at least 8 characters")
    .max(20, "Too long")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/[0-9]/, "Must include at least one number")
    .matches(/[@$!%*?&]/, "Must include at least one special character"),

  password2: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});




export const loginFormValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

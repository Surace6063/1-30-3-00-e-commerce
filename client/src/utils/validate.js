
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


// category form validation
export const categoryFormValidationSchema = yup.object().shape({
  name: yup.string().required("Category name is required")
  .min(3,"Name must be atleast 3 charcters.")
  .max(100,"Name cannot exceed 100 charcters.")
  // .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
  .trim()
})


// product form validation
export const productFormValidationSchema = yup.object({
  name: yup.string().required("Product name is required"),
  category: yup.string().required("Category is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  stock: yup
    .number()
    .typeError("Quantity must be a number")
    .integer("Quantity must be an integer")
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  description: yup.string().required("Description is required"),

  image: yup
    .mixed()
    .required("Image is required")

});


// checkout form validation
export const checkoutSchema = yup.object().shape({
  payment: yup
    .string()
    .oneOf(["cod", "e-sewa"], "Invalid payment method")
    .required("Payment method is required"),

  full_name: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  shipping_address: yup
    .string()
    .required("Shipping address is required")
    .min(5, "Address must be at least 5 characters"),
});
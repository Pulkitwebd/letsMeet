import * as yup from "yup";

const validation = yup.object().shape({
  firstname: yup
    .string()
    .max(15, "Must be 15 characters or less")
    .min(3, "Must be 3 characters or more")
    .required("First name is required"),
  lastname: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .min(3, "Must be 3 characters or more")
    .required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string().when("password", {
    is: (val) => val && val.length > 0,
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    otherwise: yup.string(),
  }),
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone number must only contain digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number can be maximum 10 digits")
    .required("Phone number is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .min(21, "Minimum age must be 21")
    .max(120, "Maximum age must be 120")
    .required("Age is required"),
});

export default validation;

import * as yup from "yup";

const validateStep1 = yup.object({
    firstname: yup
      .string()
      .max(15, "Must be 15 characters or less!")
      .min(3, "Must be 3 character or more!")
      .required("First name is required!"),
    lastname: yup
      .string()
      .max(20, "Must be 20 characters or less!")
      .min(3, "Must be 3 character or more!")
      .required("Last name is Required!"),
    email: yup.string().email("Email is invalid!").required("Email is required!"),
    password: yup
      .string()
      .min(6, "Passwoed must be at least 6 characters!")
      .required("Password is required!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "password must match!")
      .required("Confirm password is required!"),
  });
  
  const validateStep2 = yup.object({
    phone: yup.number().label("Mobile Number")
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(8)
      .required("A phone number is required"),
  });

  export {validateStep1, validateStep2};
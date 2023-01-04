import * as yup from "yup";

const validation = yup.object({
  email: yup.string().email("Email is invalid!").required("Email is required!"),
  password: yup
    .string()
    .min(6, "Passwoed must be at least 6 characters!")
    .required("Password is required!"),
});

const forgotPasswordValidation = yup.object({
    email: yup.string().email("Email is invalid!").required("Email is required!"),
});

export { validation, forgotPasswordValidation };

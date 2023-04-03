import * as yup from "yup";

const resetPasswordValidation = yup.object({
  password: yup
    .string()
    .min(6, "Passwoed must be at least 6 characters!")
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must match!")
    .required("Confirm password is required!"),
});

export default resetPasswordValidation;

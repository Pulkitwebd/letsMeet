import React from "react";
import TextField from "../Shared/TextField";
import { Formik, Form } from "formik";
import classes from "./Signin.module.css";
import { forgotPasswordValidation } from "./validation";
import Axios from "axios";

const ForgotPassword = ({ showPassPage }) => {
  return (
    <div>
      <h2 className={classes.resetPasswordName}>Reset Your Password</h2>
      <p className={classes.askingMailId}>
        Enter your email. We'll send you a link to reset your password.
      </p>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordValidation}
        onSubmit={(values) => {
          Axios.post("http://localhost:3001/api/forgot-password", {
            email: values.email,
          })
            .then(function (res) {
              if ((res.status = 200)) {
                console.log(res);
                alert("Email has been sent successfuly");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className={classes.mainForm}>
            <TextField type="email" name="email" placeholder="Email" />

            <button className={classes.loginBtn} type="submit">
              Reset Password
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;

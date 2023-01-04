import React from "react";
import TextField from "../Shared/TextField";
import { Formik, Form } from "formik";
import classes from "./ResetPassword.module.css";
import resetPasswordValidation from "./validation";
import { FaLock } from "react-icons/fa";
import Axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div className={classes.mainFormWrapper}>
      <div className={classes.formBox}>
        <FaLock />
        <h1 className={classes.PassResetHeading}>Password Reset</h1>
        <p className={classes.enterNewPassPara}>
          Enter new password and then repeat it
        </p>

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={resetPasswordValidation}
          onSubmit={(values) => {
            Axios
              .post(
                `http://localhost:3001/api/reset-password?token=${searchParams.get(
                  "token"
                )}`,
                {
                  password: values.password,
                  confirmPassword : values.confirmPassword
                }
              )
              .then(function (res) {
                if ((res.status = 200)) {
                  console.log("hello");
                  navigate("/Signin");
                }
              })
              .catch(function (error) {
                if (error) {
                  console.log(error);
                }
              });
          }}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit} className={classes.form}>
              <TextField
                type="password"
                name="password"
                placeholder="Password"
              />
              <TextField
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <div className={classes.btnCover}>
                <button className={classes.saveBtn} type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;

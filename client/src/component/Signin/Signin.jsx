import React, { useState } from "react";
import classes from "./Signin.module.css";
import ForgotPassword from "./ForgotPassword";
import { SigninForm } from "./SigninForm";

const Signin = () => {
  const [passPage, showPassPage] = useState(false);

  return (
    <div className={classes.signinPage}>
      <div className={classes.greenBackground}>
        <div className={classes.greenPart}>
          <img />
          <p></p>
        </div>
      </div>
      <div className={classes.whiteBackground}>
        <div className={classes.whitePart}>
          {passPage ? (
            <ForgotPassword showPassPage={showPassPage}/>
          ) : (
            <SigninForm showPassPage={showPassPage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;

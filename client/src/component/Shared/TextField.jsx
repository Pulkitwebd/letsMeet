import React from "react";
import classes from "../Signup/Signup.module.css"
import { ErrorMessage, useField } from "formik";

const TextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={field.name}>{placeholder}</label>
      <input
        className={`${
          meta.touched && meta.error ? classes.onErrorInput : classes.input
        }`}
        {...field}
        {...props}
        placeholder={placeholder}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className={classes.errorMsg}
      />
    </div>
  );
};

export default TextField;

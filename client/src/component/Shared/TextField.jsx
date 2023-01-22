import React, { useState, useCallback } from "react";
import classes from "../Signup/Signup.module.css";
import { ErrorMessage, useField } from "formik";
import { FaRegWindowClose } from "react-icons/fa";

const TextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const [closeButton, setCloseButton] = useState(props.closeButton);

  return (
    <div>
      <label htmlFor={field.name}>
        {props.label ? props.label : placeholder}
      </label>
      <input
        className={`${
          meta.touched && meta.error ? classes.onErrorInput : classes.input
        }`}
        {...field}
        {...props}
        placeholder={placeholder}
        autoComplete="off"
        readOnly={props.isDisabled ? true : false}
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

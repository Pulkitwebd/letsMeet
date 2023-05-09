import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Formik, Form } from "formik";
import Select from "react-select";

import CustomTextField from "../../../Shared/TextField";
import indianStates from ".././StateNames";
import cityNames from ".././CityNames";
import category from ".././Category";
import classes from ".././Modal.module.css";
import { StepOneValidation, StepTwoValidation } from "./validationAllSteps";

export const StepOne = (props) => {
  const handleSubmit = (values) => {
    console.log("Step 1", values);
    props.next(values);
  };

  return (
    <Formik
      initialValues={props.eventData}
      onSubmit={handleSubmit}
      validationSchema={StepOneValidation}
    >
      {(formik) => (
        <Form>
          <CustomTextField
            type="text"
            name="fullName"
            label="Full Name : "
            placeholder={`${props.userDetails.userFullName}`}
            isDisabled={true}
            style={{ marginTop: "10px" }}
          />

          <CustomTextField
            type="email"
            name="email"
            label="Email : "
            placeholder={`${props.userDetails.userEmail}`}
            isDisabled={true}
          />

          <CustomTextField
            type="text"
            name="title"
            label="Title : "
            placeholder=""
          />

          <div className={classes.categorySelect}>
            <label>Category : </label>
            <Select
              name="category"
              options={category}
              classNamePrefix="select"
              onChange={(category) =>
                formik.setFieldValue("category", category.value)
              }
            />
            {formik.touched.category && formik.errors.category ? (
              <div style={{ color: "red" }}>{formik.errors.category}</div>
            ) : null}
          </div>

          <CustomTextField
            type="number"
            name="personNeeded"
            label="Person Needed : "
            placeholder=""
          />

          <CustomTextField
            type="textarea"
            cols="5"
            rows="5"
            name="desc"
            label="Description : "
            placeholder=""
          />

          <label>Schedule Event Date and time : </label>
          <div style={{ marginTop: "5px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label=""
                value={props.value}
                onChange={(newValue) => {
                  props.setValue(newValue);
                }}
                name="Time"
              />
            </LocalizationProvider>
          </div>

          <div className={classes.nextButtonCover}>
            <button className={classes.nextButton} type="submit">
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const StepTwo = (props) => {
  const handleSubmit = (values) => {
    console.log("Step 2", values);
    props.next(values);
  };

  return (
    <Formik
      initialValues={props.eventData}
      onSubmit={handleSubmit}
      validationSchema={StepTwoValidation}
    >
      {(formik) => (
        <Form>
          <CustomTextField
            type="text"
            name="area"
            label="Area, Street, Sector, Village : "
            placeholder=""
          />

          <CustomTextField
            type="text"
            name="houseNo"
            label="Flat, House no, Building, Company, Apartment : "
            placeholder=""
          />

          <CustomTextField
            type="text"
            name="landmark"
            label="Land Mark : "
            placeholder=""
          />

          <div className={classes.categorySelect}>
            <label>City : </label>
            <Select
              name="city"
              options={cityNames}
              classNamePrefix="select"
              onChange={(city) => formik.setFieldValue("city", city.value)}
            />
            {formik.touched.city && formik.errors.city ? (
              <div style={{ color: "red" }}>{formik.errors.city}</div>
            ) : null}
          </div>

          <div className={classes.categorySelect}>
            <label>State : </label>
            <Select
              name="state"
              options={indianStates}
              onChange={(state) => formik.setFieldValue("state", state.value)}
              classNamePrefix="select"
            />
            {formik.touched.state && formik.errors.state ? (
              <div style={{ color: "red" }}>{formik.errors.state}</div>
            ) : null}
          </div>

          <div className={classes.prevNextButtonsCover}>
            <button
              className={classes.prevButton}
              onClick={props.prev}
              type="button"
            >
              Previous
            </button>
            <button className={classes.nextButton} type="submit">
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const StepThree = (props) => {
  const handleSubmit = (values) => {
    console.log("Step 3", values);
    props.next(values, true);
  };

  return (
    <Formik
      initialValues={props.eventData}
      onSubmit={handleSubmit}
      // validationSchema={validation}
    >
      {(formik) => (
        <Form>
          <div>
            <input
              type="file"
              name="eventImage"
              placeholder="Choose Event Image"
              onChange={props.handleEventImg}
              accept=".jpeg, .png, .jpg"
            />
            <div>
              {props.eventImageUrl && (
                <img
                  src={props.eventImageUrl}
                  className={classes.eventImg}
                  alt="Selected"
                />
              )}
            </div>
          </div>

          <div className={classes.prevNextButtonsCover}>
            <button
              className={classes.prevButton}
              onClick={props.prev}
              type="button"
            >
              Previous
            </button>
            <button className={classes.nextButton} type="submit">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

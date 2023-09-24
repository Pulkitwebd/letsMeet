import React, { useState } from "react";
import Modal from "react-modal";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import classes from "./update.module.css";
import validation from "./validation";
import { InputLabel, Input } from "@mui/material";

const UpdateProfile = (props) => {
  const { user } = useSelector((state) => state.auth);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleToggleChange = (e) => {
    setShowPasswordFields(e.target.checked);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "500px",
      height: "500px",
    },
  };

  return (
    <Modal
      isOpen={props.showModal}
      ariaHideApp={false}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h4 className={classes.heading}>EDIT PROFILE</h4>
      <button
        onClick={props.handleCloseModal}
        className="btn btn-secondary"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        Close
      </button>

      <Formik
        initialValues={{
          firstname: (user && user.user && user.user.firstname) || "",
          lastname: (user && user.user && user.user.lastname) || "",
          email: (user && user.user && user.user.email) || "",
          password: "",
          confirmPassword: "",
          age: (user && user.user && user.user.age) || "",
          phone: (user && user.user && user.user.phone.toString()) || "",
        }}
        validationSchema={validation}
        onSubmit={props.handleUserUpdate}
      >
        {(formik) => (
          <Form className={classes.mainForm} onSubmit={formik.handleSubmit}>
            <div className={classes.inputFields}>
              <InputLabel htmlFor="exampleFirstName" className="form-label">
                First Name :
              </InputLabel>
              <div className={classes.inputBox}>
                <Input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                />
                {formik.touched.firstname && formik.errors.firstname && (
                  <div style={{ color: "#cc0000" }}>
                    {formik.errors.firstname}
                  </div>
                )}
              </div>
            </div>
            <div className={classes.inputFields}>
              <InputLabel htmlFor="" className="form-label">
                Last Name :
              </InputLabel>
              <div className={classes.inputBox}>
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  aria-label="Last name"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                />
                {formik.touched.lastname && formik.errors.lastname && (
                  <div style={{ color: "#cc0000" }}>
                    {formik.errors.lastname}
                  </div>
                )}
              </div>
            </div>
            <div className={classes.inputFields}>
              <InputLabel htmlFor="">Email :</InputLabel>
              <div className={classes.inputBox}>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                  <div style={{ color: "#cc0000" }}>{formik.errors.email}</div>
                )}
              </div>
            </div>
            <div className={classes.inputFields}>
              <InputLabel htmlFor="" className="form-label">
                Age :
              </InputLabel>
              <div className={classes.inputBox}>
                <Input
                  type="text"
                  name="age"
                  placeholder="Age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                />
                {formik.touched.age && formik.errors.age && (
                  <div style={{ color: "#cc0000" }}>{formik.errors.age}</div>
                )}
              </div>
            </div>
            <div className={classes.inputFields}>
              <InputLabel htmlFor="">Phone :</InputLabel>
              <div className={classes.inputBox}>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div style={{ color: "#cc0000" }}>{formik.errors.phone}</div>
                )}
              </div>
            </div>
            <div>
              <div>
                <p className={classes.passChange}>Change password</p>
                <label className={`${classes.switch} ${classes.round}`}>
                  <input type="checkbox" onChange={handleToggleChange} />
                  <span className={classes.slider}></span>
                </label>
              </div>
              {showPasswordFields && (
                <>
                  <div className={classes.inputFields}>
                    <InputLabel htmlFor="">Password : </InputLabel>
                    <div className={classes.inputBox}>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.password && formik.errors.password && (
                        <div style={{ color: "#cc0000" }}>
                          {formik.errors.password}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={classes.inputFields}>
                    <InputLabel htmlFor="">Confirm Password :</InputLabel>
                    <div className={classes.inputBox}>
                      <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                          <div style={{ color: "#cc0000" }}>
                            {formik.errors.confirmPassword}
                          </div>
                        )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              type="submit"
              className={`${classes.submitButton} btn btn-success`}
            >
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateProfile;

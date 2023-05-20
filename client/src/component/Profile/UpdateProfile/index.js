import React from "react";
import Modal from "react-modal";
import * as yup from "yup";
import { Formik, Form } from "formik";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const UpdateProfile = (props) => {
  return (
    <Modal
      isOpen={props.showModal}
      ariaHideApp={false}
      //   className={classes.modal}
      contentLabel="Example Modal"
    >
      <button
        onClick={props.toggalProfileModal}
        className="btn btn-secondary"
        style={{ marginLeft: 480 }}
      >
        Close
      </button>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          phone: "",
          age: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log("inside submit", values);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleFirstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                aria-label="First name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleLastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                aria-label="Last name"
                {...formik.getFieldProps("last-name")}
              />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                New Email{" "}
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter new email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div>{formik.errors.email}</div>
              )}
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label HtmlFor="exampleInputPassword1" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter new password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div>{formik.errors.password}</div>
              )}
            </div>
            <div className="mb-3">
              <label HtmlFor="exampleInputPassword1" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Confirm password"
              />
            </div>
            <div className="mb-3">
              <label HtmlFor="exampleInputPhone" className="form-label">
                {" "}
                Change Phone
              </label>
              <input
                type="phone"
                className="form-control"
                id="exampleInputPhone"
                placeholder="+91 0000000000"
              />
            </div>
            <div className="mb-3">
              <label HtmlFor="exampleInputAge" className="form-label">
                Age
              </label>
              <input
                type="age"
                className="form-control"
                id="exampleInputAge"
                placeholder="Enter your age"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateProfile;

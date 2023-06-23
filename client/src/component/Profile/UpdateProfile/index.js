import React from "react";
import Modal from "react-modal";
import * as yup from "yup";
import { Formik, Form } from "formik";


const schema = yup.object().shape({
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  email: yup.string().email("Invalid email").required("Email is required!"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters!")
    .required("Password is required!"),
    phoneNumber: yup
    .string()
    .matches(/^\d+$/, 'Phone number must only contain digits!')
    .min(10, 'Phone number must be at least 10 digits!')
    .max(10, 'Phone number can be maximum 10 digits!')
    .required('Phone number is required!'),
    age: yup
    .number()
    .min(21, 'Minimum age must be 21!')
    .max(120, 'Maximum age must be 120!')
    .required('Age is required!'),

});
const UpdateProfile = (props) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      height: '500px',
    },
  };
  return (
    <Modal
      isOpen={props.showModal}
      ariaHideApp={false}
      style={customStyles}
      contentLabel="Example Modal"
    >

      <h1>EDIT PROFILE</h1>
      <button
        onClick={props.toggalProfileModal}
        className="btn btn-secondary"
        style={{  position: 'absolute',
          top: 10,
          right: 10}}
      >
        Close
      </button>
      <Formik
        initialValues={{
          firstName: "",
          lastName:"",
          email: "",
          password: "",
          phone: "",
          age: "",
          phoneNumber: '',
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log("inside submit", values);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className="my-form" >
            <div className="mb-3">
              <label htmlFor="exampleFirstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                aria-label="First name"
                {...formik.getFieldProps('firstName')}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div style={{ color: '#cc0000' }}>{formik.errors.firstName}</div>
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
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div style={{ color: '#cc0000' }}>{formik.errors.lastName}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                New Email
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
                <div style={{color:'#cc0000'}}>{formik.errors.email}</div>
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
                <div style={{color : '#cc0000'}}>{formik.errors.password}</div>
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
                {...formik.getFieldProps("email")}
              />
                 {formik.touched.password && formik.errors.password && (
                <div style={{color : '#cc0000'}}>{formik.errors.password}</div>
              )}
            </div>
            <div className="mb-3">
              <label HtmlFor="exampleInputPhone" className="form-label">

                Change Phone
              </label>
              <input
                type="phone"
                className="form-control"
                id="exampleInputPhone"
                placeholder="0000000000"
                {...formik.getFieldProps('phoneNumber')}
              />
               {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <div style={{ color: '#cc0000' }}>{formik.errors.phoneNumber}</div>
        )}
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
                {...formik.getFieldProps('age')}
              />
                {formik.touched.age && formik.errors.age && (
          <div style={{ color: '#cc0000' }}>{formik.errors.age}</div>
        )}
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
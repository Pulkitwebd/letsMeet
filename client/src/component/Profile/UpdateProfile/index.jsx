import React, { useState } from "react";
import Modal from "react-modal";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";

import classes from "./update.module.css";

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
  const [selected, setSelected] = useState('');
  const [selectedLastName, setSelectedLastName] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState(false);
  const [selectedCurrentPassword, setSelectedCurrentPassword] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(false);
  const [selectedAge, setSelectedAge] = useState(false);

  const [editableValue,] = useState("");
  const { user } = useSelector((state) => state.auth);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
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
        style={{
          position: 'absolute',
          top: 10,
          right: 10
        }}
      >
        Close
      </button>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
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
          <Form onSubmit={formik.handleSubmit} className={classes.form} >

            <div className="row">

              <label htmlFor="exampleFirstName" className="form-label">
                First Name
                {selected ? (
                  <div className={classes.editableInput}>
                    <AiFillEdit className={classes.editIcon} onClick={() => setSelected(true)} />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      aria-label="First name"
                      value={editableValue}
                      name="firstName"
                      {...formik.getFieldProps("firstName")}
                    />
                     {formik.touched.firstName && formik.errors.firstName && (
                      <div style={{ color: '#cc0000' }}>{formik.errors.firstName}</div>
                    )}
                  </div>
                ) : (
                  <div className={classes.readOnlyInput}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={user.user.firstname}
                      readOnly
                      aria-label="First name"
                      {...formik.getFieldProps("firstName")}
                    />
                    <AiFillEdit className={classes.editIcon} onClick={() => setSelected(true)} />
                  </div>
                )}
              </label>
            </div>

            <div className="row">
              <label htmlFor="exampleFirstName" className="form-label">
                Last Name
                {selectedLastName ? (
                  <div className={classes.editableInput}>
                    <AiFillEdit className={classes.editIcon} onClick={() => setSelectedLastName(true)} />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      aria-label="Last name"
                      value={editableValue}
                      name="lastName"
                      {...formik.getFieldProps("lastName")}
                    />
                     {formik.touched.lastName && formik.errors.lastName && (
                      <div style={{ color: '#cc0000' }}>{formik.errors.lastName}</div>
                    )}
                  </div>
                ) : (
                  <div className={classes.readOnlyInput}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={user.user.lastname}
                      readOnly
                      aria-label="Last name"
                      {...formik.getFieldProps("lastname")}
                    />
                    <AiFillEdit className={classes.editIcon} onClick={() => setSelectedLastName(true)} />
                  </div>
                )}
              </label>
            </div>

            <div className="row">
              <label htmlFor="exampleFirstName" className="form-label">
                Email
                {selectedEmail ? (
                  <div className={classes.editableInput}>
                    <AiFillEdit className={classes.editIcon} onClick={() => setSelectedEmail(true)} />
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="enter new email"
                      value={editableValue}
                      name="email"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div style={{ color: '#cc0000' }}>{formik.errors.email}</div>

                    )}
                  </div>
                ) : (
                  <div className={classes.readOnlyInput}>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder={user.user.email}
                      name="email"
                    />
                    <div id="emailHelp" className="form-text"></div>
                    <AiFillEdit className={classes.editIcon} onClick={() => setSelectedEmail(true)} />
                  </div>
                )}
              </label>
            </div>

            <div className="row">
              <label htmlFor="exampleFirstName" className="form-label">
                Password
                {selectedPassword ? (
                  <div className={classes.editableInput}>
                    <AiFillEdit className={classes.editIcon} onClick={() => setSelectedPassword(true)} />
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="enter new password"
                      value={editableValue}
                      {...formik.getFieldProps("password")}

                    />
                      {formik.touched.password && formik.errors.password && (
                      <div style={{ color: '#cc0000' }}>{formik.errors.password}</div>
                    )}
                  </div>
                ) : (
                  <div className={classes.readOnlyInput}>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder={user.user.password}

                    />

                    <AiFillEdit className={classes.editIcon} onClick={() => setSelectedPassword(true)} />
                  </div>
                )}
              </label>
            </div>

            <div className="row">
              <label htmlFor="exampleFirstName" className="form-label">
                Confirm Password
                {selectedCurrentPassword ? (
                  <div className={classes.editableInput}>
                    <AiFillEdit className={classes.editIcon} onClick={() => setSelectedCurrentPassword(true)} />
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="enter new password"
                      value={editableValue}
                      {...formik.getFieldProps("password")}

                    />
                       {formik.touched.password && formik.errors.password && (
                      <div style={{ color: '#cc0000' }}>{formik.errors.password}</div>
                    )}
                  </div>
                ) : (
                  <div className={classes.readOnlyInput}>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder={user.user.password}

                    />

                    <AiFillEdit className={classes.editIcon} onClick={() => setSelectedCurrentPassword(true)} />
                  </div>
                )}
              </label>
            </div>

            <div className="row">
              <label htmlFor="exampleFirstName" className="form-label">
                Phone number
                {selectedPhone ? (
                  <div className={classes.editableInput}>
                    <AiFillEdit className={classes.editIcon} onClick={() => setSelectedPhone(true)} />
                    <input
                      type="phone"
                      className="form-control"
                      id="exampleInputPhone"
                      placeholder="0000000000"
                      value={editableValue}
                      {...formik.getFieldProps('phoneNumber')}


                    />
                     {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                      <div style={{ color: '#cc0000' }}>{formik.errors.phoneNumber}</div>
                    )}
                  </div>
                ) : (
                  <div className={classes.readOnlyInput}>
                    <input
                      type="phone"
                      className="form-control"
                      id="exampleInputPhone"
                      placeholder={user.user.phone}

                    />
                    <AiFillEdit className={classes.editIcon} onClick={() => setSelectedPhone(true)} />
                  </div>
                )}
              </label>
            </div>

            <div className="row">
              <label htmlFor="exampleFirstName" className="form-label">
                Age
                {selectedAge ? (
                  <div className={classes.editableInput}>
                    <AiFillEdit className={classes.editIcon} onClick={() => setSelectedAge(true)} />
                    <input
                      type="age"
                      className="form-control"
                      id="exampleInputAge"
                      placeholder="Enter your age"
                      value={editableValue}
                      {...formik.getFieldProps('age')}

                    />
                     {formik.touched.age && formik.errors.age && (
                      <div style={{ color: '#cc0000' }}>{formik.errors.age}</div>
                    )}
                  </div>
                ) : (
                  <div className={classes.readOnlyInput}>
                    <input
                      type="age"
                      className="form-control"
                      id="exampleInputAge"
                      placeholder={user.user.age}
                    />
                    <AiFillEdit className={classes.editIcon} onClick={() => setSelectedAge(true)} />
                  </div>
                )}
              </label>

            </div>
            <button type="submit" className="btn btn-success" >
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
export default UpdateProfile;
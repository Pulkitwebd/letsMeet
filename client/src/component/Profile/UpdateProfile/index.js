import React from "react";
import Modal from "react-modal";

const UpdateProfile = (props) => {
  return (
    <Modal
      isOpen={props.showModal}
      ariaHideApp={false}
      //   className={classes.modal}
      contentLabel="Example Modal"
    >
      <button onClick={props.toggalProfileModal} >
        Close
      </button>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleFirstName" className="form-label">
            First Name{" "}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            aria-label="First name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleLastName" className="form-label">
            Last Name{" "}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            aria-label="Last name"
          />
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
          />
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
          />
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
      </form>
    </Modal>
  );
};

export default UpdateProfile;

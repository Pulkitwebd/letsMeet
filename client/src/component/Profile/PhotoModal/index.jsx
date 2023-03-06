import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import classes from "./PhotoModal.module.css";
import { useSelector } from "react-redux";

const PhotoModal = (props) => {
  const { user } = useSelector((state) => state.auth);

  const [eventImageUrl, setEventImageUrl] = useState(null);
  const [eventImageBase64, setEventImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [randomString, setRandomString] = useState(
    Math.random()
      .toString(36)
      .substring(2, 15) + Date.now()
  );

  const handleEventImg = async (event) => {
    const selectedFile = event.target.files[0];

    const base64 = await convertToBase64(selectedFile);
    setEventImageBase64(base64);

    setEventImageUrl(URL.createObjectURL(selectedFile));
  };

  const handleCancelButton = () => {
    props.togglePhotoModal();
    setEventImageUrl(null);
  };

  const handlePostSubmit = async () => {
    setLoading(true);
    const formData = {
      user_id: user.user._id,
      userPhoto: eventImageBase64,
    };

    axios
      .put("/api/auth/update", formData)
      .then((response) => {
        if (response.status === 201) {
          setRandomString(
            Math.random()
              .toString(36)
              .substring(2, 15) + Date.now()
          );
          props.togglePhotoModal(
            response.data.updatedUser,
            response.status,
            randomString
          );
          // props.togglePhotoModal();
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal
        isOpen={props.photoModalStatus}
        onRequestClose={props.togglePhotoModal}
        className={classes.PhotoModal}
      >
        <h2>Update Your Image</h2>

        <button className={classes.closeModal} onClick={handleCancelButton}>
          Cancel
        </button>

        <div className={classes.chooseFileDiv}>
          <input
            type="file"
            name="eventImage"
            placeholder="Choose Event Image"
            onChange={handleEventImg}
            accept=".jpeg, .png, .jpg"
          />
          <div>
            {eventImageUrl && (
              <img
                src={eventImageUrl}
                className={classes.userPhoto}
                alt="Selected"
              />
            )}
          </div>
        </div>
        {eventImageBase64 && (
          <button onClick={handlePostSubmit} className={classes.postButton}>
            {" "}
            {loading ? "loading" : "Post"}
          </button>
        )}
      </Modal>
    </>
  );
};

export default PhotoModal;

const convertToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};

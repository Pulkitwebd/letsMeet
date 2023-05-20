import React, { useState } from "react";
import Modal from "react-modal";
import classes from "./PhotoModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { updateUserPhoto } from "../../../Redux/Auth/authSlice";

const PhotoModal = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [eventImageUrl, setEventImageUrl] = useState(null);
  const [eventImageBase64, setEventImageBase64] = useState(null);

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
    const formData = {
      user_id: user.user._id,
      userPhoto: eventImageBase64,
    };
    dispatch(updateUserPhoto(formData));
    
    props.togglePhotoModal();
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
           
            Post
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

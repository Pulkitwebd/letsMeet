import React, { useState } from "react";
import Modal from "react-modal";
import imageCompression from "browser-image-compression";
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
    try {
      const compressedFile = await handleImageUpload(selectedFile);
      const base64 = await convertToBase64(compressedFile);
      setEventImageBase64(base64);
      setEventImageUrl(URL.createObjectURL(selectedFile));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelButton = () => {
    props.togglePhotoModal();
    setEventImageUrl(null);
  };

  const handlePostSubmit = async () => {
    const formData = {
      token : user.token,
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

const convertToBase64 = async (compressedFile) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(compressedFile);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};

const handleImageUpload = async (imageFile) => {
  const options = {
    maxSizeMB: 0.1, //100 KB
    maxWidthOrHeight: 1920,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.log(error);
  }
};

import axios from "axios";
import { currentlyInUseServer } from "../../api";
import { sendFriendInvitation } from "../Friends/friendSlice";
import store from "../Store";

const REGISTER_URL = `${currentlyInUseServer}api/auth/register`;
const LOGIN_URL = `${currentlyInUseServer}api/auth/login`;
const UPDATE_URL = `${currentlyInUseServer}api/auth/updatePhoto`;

// Register user
const register = async (userData) => {
  const response = await axios.post(REGISTER_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(LOGIN_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    store.dispatch(
      sendFriendInvitation({
        // Dispatch the action to fetch pending friend requests
        senderId: response.data.user._id,
        token: response.data.token,
      })
    );
  }
  return response.data;
};

// Update user photo
const updatePhoto = async (userData) => {
  const body = { userPhoto: userData.userPhoto };
  const response = await axios.put(UPDATE_URL, body, {
    headers: {
      authorization: userData.token,
    },
  });

  if (response.status === 201) {
    try {
      const userJson = localStorage.getItem("user");
      const user = JSON.parse(userJson);

      const updatedUserData = response.data.updatedUser;
      user.user.photo = updatedUserData.photo;

      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (e) {
      console.error("Error updating user:", e);
    }
  } else {
    console.error(`Unexpected response status: ${response.status}`);
  }

  return null;
};

// Update user
const updateUser = async (userData) => {
  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);
  console.log("user.user._id" , user.user._id  )
  const { _id } = user.user; 

  const UPDATE_USER_URL = `${currentlyInUseServer}api/auth/updateUser/${_id}`;

  const response = await axios.put(UPDATE_USER_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("receiverPendingInvitaion");
  localStorage.removeItem("pendingInvitations");
};

const authService = { register, logout, login, updatePhoto, updateUser };

export default authService;

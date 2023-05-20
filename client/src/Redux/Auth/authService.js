import axios from "axios";

const REGISTER_URL = "https://letsmeet.onrender.com/api/auth/register";
const LOGIN_URL = "https://letsmeet.onrender.com/api/auth/login";
const UPDATE_URL = "https://letsmeet.onrender.com/api/auth/updatePhoto";

//Register user
const register = async (userData) => {
  const response = await axios.post(REGISTER_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//login user
const login = async (userData) => {
  const response = await axios.post(LOGIN_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//Update user
const updatePhoto = async (userData) => {
  let user;
  const response = await axios.put(UPDATE_URL, userData);

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

  return user;
};

//Logout
const logout = () => {
  localStorage.removeItem("user");
};

const authService = { register, logout, login, updatePhoto };

export default authService;

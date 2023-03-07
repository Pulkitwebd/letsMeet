import axios from "axios";

const REGISTER_URL = "/api/auth/register";
const LOGIN_URL = "/api/auth/login";
const UPDATE_URL = "/api/auth/update";

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
    console.log(response.data)
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//update user
const update = async (userData) => {
  const response = await axios.put(UPDATE_URL, userData);

  if (response.status == 201) {
    console.log("response", response)
    // localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//logout
const logout = () => {
  localStorage.removeItem("user");
};

const authService = { register, logout, login, update };

export default authService;

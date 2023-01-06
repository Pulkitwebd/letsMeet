import axios from "axios";

const REGISTER_URL = "/api/auth/register";
const LOGIN_URL = "/api/auth/login"

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

//logout
const logout = () => {
  localStorage.removeItem("user");
};

const authService = { register, logout, login };

export default authService;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Auth/authSlice";
import friendReducer from "../Redux/Friends/friendSlice"
import alertReducer from "../Redux/Alert/alertSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    friend : friendReducer,
    alert : alertReducer,
  },
});

export default store;

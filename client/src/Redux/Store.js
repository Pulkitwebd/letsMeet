import { configureStore } from "@reduxjs/toolkit";
import authTokenReducer from "../Redux/AuthToken/AuthToken";

const store = configureStore({
  reducer: {
    authToken: authTokenReducer.reducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

//verifying auth token and getting user detail by using user id
const AuthTokenSlice = createSlice({
  name: "AuthToken",
  initialState: {
    token: "",
  },
  reducers: {
    verifyToken(state, action) {
      //   state.token = action.payload;
      let token = localStorage.getItem("token");
      state.token = token;
    },
  },
});

export const authTokenAction = AuthTokenSlice.actions;
export default AuthTokenSlice;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlertMessage: false,
  alertMessageContent: null,
};

export const alertSlice = createSlice({
  name: "Alert",
  initialState,
  reducers: {
    OPEN_ALERT_MESSAGE: (state, action) => {
      state.showAlertMessage = true;
      state.alertMessageContent = action.content;
    },
    CLOSE_ALERT_MESSAGE: (state) => {
      state.showAlertMessage = false;
      state.alertMessageContent = null;
    },
    reset: (state) => {
      state.showAlertMessage = false;
      state.alertMessageContent = null;
    },
  },
});

export const { OPEN_ALERT_MESSAGE, CLOSE_ALERT_MESSAGE, reset } =
alertSlice.actions;
export default alertSlice.reducer;

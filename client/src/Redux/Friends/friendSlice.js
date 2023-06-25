import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import friendService from "./friendService";

const PENDING_INVITATIONS_KEY = "pendingInvitations";

const receiverPendingInvitaion = JSON.parse(
  localStorage.getItem("receiverPendingInvitaion")
);

const initialState = {
  friends: [],
  // person whom login user send request
  receiverPendingInvitaion: receiverPendingInvitaion
    ? receiverPendingInvitaion
    : [],
  pendingFriendsInvitations:
    JSON.parse(localStorage.getItem(PENDING_INVITATIONS_KEY)) || [],
  onlineUsers: [],
};

export const sendFriendInvitation = createAsyncThunk(
  "friend/sendFriendInvitation",
  async (data, thunkAPI) => {
    try {
      // request which logged in user send
      const allPendingFriendRequest =
        await friendService.fetchingAllPendingFriendRequest(data);
      return allPendingFriendRequest;
    } catch (error) {
      throw error;
    }
  }
);

export const acceptFriendInvitation = createAsyncThunk(
  "friend/sendFriendInvitation",
  async (data, thunkAPI) => {
    try {
      // request which logged in user send
      const acceptFriendInvitation =
        await friendService.acceptFriendInvitation(data);
      return acceptFriendInvitation;
    } catch (error) {
      throw error;
    }
  }
);


export const rejectFriendInvitation = createAsyncThunk(
  "friend/sendFriendInvitation",
  async (data, thunkAPI) => {
    try {
      // request which logged in user send
      const rejectFriendInvitation =
        await friendService.rejectFriendInvitation(data);
      return rejectFriendInvitation;
    } catch (error) {
      throw error;
    }
  }
);


export const friendSlice = createSlice({
  name: "Friends",
  initialState,
  reducers: {
    resetFriendSlice: (state) => {
      state.friends = [];
      state.receiverPendingInvitaion = [];
      state.onlineUsers = [];
      state.pendingFriendsInvitations = []
    },
    // request which logged in user get
    updatePendingInvitations: (state, action) => {
      state.pendingFriendsInvitations = action.payload;
      
      // Persist the data in localStorage
      localStorage.setItem(
        PENDING_INVITATIONS_KEY,
        JSON.stringify(action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendFriendInvitation.fulfilled, (state, action) => {
      const receiversPendingRequest = action.payload;
      if (receiversPendingRequest) {
        state.receiverPendingInvitaion = [...receiversPendingRequest];
      }
    });

    // builder.addCase(upcomingFriendInvitation.fulfilled, (state, action) => {
    //   const upcomingFriendRequest = action.payload;
    //   if (upcomingFriendRequest) {
    //     state.pendingFriendsInvitations.push(...upcomingFriendRequest);
    //   }
    // });
  },
});

export const { resetFriendSlice, updatePendingInvitations } =
  friendSlice.actions;

export default friendSlice.reducer;

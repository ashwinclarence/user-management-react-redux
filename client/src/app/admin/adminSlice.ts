import { createSlice } from "@reduxjs/toolkit";
import { currentUserType } from "../../types/type";

const initialState = {
  adminStatus: false,
  adminLoading: false, 
  error: false,
  userDetails: [], 
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminSignInStart: (state) => {
      state.adminLoading = true;
    },
    adminSignInSuccess: (state, action) => {
      state.adminStatus = action.payload;
      state.adminLoading = false;
      state.error = false;
    },
    adminSignInFailure: (state, action) => {
      state.adminLoading = false;
      state.error = action.payload;
    },
    fetchUserDetailsStart: (state) => {
      state.adminLoading = true;
    },
    fetchUserDetailsSuccess: (state, action) => {
      state.userDetails = action.payload;
      state.adminLoading = false;
      state.error = false;
    },
    fetchUserDetailsFailure: (state, action) => {
      state.adminLoading = false;
      state.error = action.payload;
    },
    adminSignOut: (state) => {
      state.adminStatus = false;
      state.adminLoading = false;
      state.error = false;
      state.userDetails = [];  
    },
    deleteUserStart: (state) => {
      state.adminLoading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.userDetails = state.userDetails.filter((user:currentUserType) => user._id !== action.payload);  
      state.adminLoading = false;
    },
    deleteUserFailure: (state, action) => {
      state.adminLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  adminSignOut,
  adminSignInFailure,
  adminSignInSuccess,
  adminSignInStart,
  fetchUserDetailsStart,
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess
} = adminSlice.actions;

export default adminSlice.reducer;

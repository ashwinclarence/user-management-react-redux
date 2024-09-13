import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminStatus: false,
  adminLoading: false, 
  error: false,
  userDetails: null, 
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
      state.userDetails = null;  
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
} = adminSlice.actions;

export default adminSlice.reducer;

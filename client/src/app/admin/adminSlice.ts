import { createSlice } from "@reduxjs/toolkit";
import { currentUserType } from "../../types/type";

type InitialStateType = {
  adminStatus: boolean;
  adminLoading: boolean;
  error: boolean;
  userDetails: currentUserType[];
}

const initialState:InitialStateType = {
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
    editUserStart: (state) => {
      state.error = false;
      state.adminLoading = true;
    },
    editUserSuccess: (state, action) => {
      state.userDetails = state.userDetails.map((user: currentUserType) =>
        user._id === action.payload.userDetail._id 
          ? { ...user, ...action.payload.userDetail } 
          : user
      );
      state.adminLoading = false;
    },
    editUserFailure: (state,action) => {
      state.error = action.payload;
      state.adminLoading = false;
    },
    addNewUserStart: (state) => {
      state.adminLoading = true;
      state.error = false;
    },
    addNewUserSuccess: (state, action) => {
      state.adminLoading = false;
      state.userDetails=[action.payload.newUser,...state.userDetails]
    },
    addNewUserFailure: (state,action) => {
      state.adminLoading = false;
      state.error = action.payload;
    }
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
  deleteUserSuccess,
  editUserFailure,
  editUserStart,
  editUserSuccess,
  addNewUserFailure,
  addNewUserStart,
  addNewUserSuccess
} = adminSlice.actions;

export default adminSlice.reducer;

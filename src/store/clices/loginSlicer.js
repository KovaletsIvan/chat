import { createSlice } from "@reduxjs/toolkit";

const loginSlicer = createSlice({
  name: "loginData",
  initialState: {
    userData: {},
  },
  reducers: {
    logIn(state, action) {
      state.userData = action.payload;
    },
    logOut(state, action) {
      state.userData = {};
    },
  },
});

export const { logIn, logOut } = loginSlicer.actions;

export default loginSlicer.reducer;

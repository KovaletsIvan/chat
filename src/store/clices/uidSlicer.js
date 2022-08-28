import { createSlice } from "@reduxjs/toolkit";

const uidSlicer = createSlice({
  name: "uid",
  initialState: {
    uid: "",
  },
  reducers: {
    getUid(state, action) {
      state.uid = action.payload;
    },
    removeUid(state, action) {
      state.uid = "";
    },
  },
});

export const { getUid, removeUid } = uidSlicer.actions;

export default uidSlicer.reducer;

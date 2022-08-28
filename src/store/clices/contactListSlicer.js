import { createSlice } from "@reduxjs/toolkit";

const contactListSlicer = createSlice({
  name: "contactList",
  initialState: {
    contactList: [],
  },
  reducers: {
    getList(state, action) {
      state.contactList = action.payload;
    },
    removeList(state, action) {
      state.contactList = [];
    },
  },
});

export const { getList, removeList } = contactListSlicer.actions;

export default contactListSlicer.reducer;

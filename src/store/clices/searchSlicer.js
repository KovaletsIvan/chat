import { createSlice } from "@reduxjs/toolkit";

const searchSlicer = createSlice({
  name: "searchData",
  initialState: {
    searchData: "",
  },
  reducers: {
    searchContact(state, action) {
      state.searchData = action.payload;
    },
  },
});

export const { searchContact } = searchSlicer.actions;

export default searchSlicer.reducer;

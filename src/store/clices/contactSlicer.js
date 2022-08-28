import { createSlice } from "@reduxjs/toolkit";

const contactSlicer = createSlice({
  name: "contact",
  initialState: {
    contact: "TtTTwCqAMNFY7pVQRtkp",
  },
  reducers: {
    getContact(state, action) {
      state.contact = action.payload;
    },
  },
});

export const { getContact } = contactSlicer.actions;

export default contactSlicer.reducer;

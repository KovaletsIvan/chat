import { combineReducers, configureStore } from "@reduxjs/toolkit";

import loginSlicer from "./clices/loginSlicer";
import contactListSlicer from "./clices/contactListSlicer";
import searchSlicer from "./clices/searchSlicer";
import contactSlicer from "./clices/contactSlicer";
import uidSlicer from "./clices/uidSlicer";

const reducers = combineReducers({
  loginData: loginSlicer,
  list: contactListSlicer,
  search: searchSlicer,
  contact: contactSlicer,
  uidContact: uidSlicer,
});

export default configureStore({
  reducer: reducers,
});

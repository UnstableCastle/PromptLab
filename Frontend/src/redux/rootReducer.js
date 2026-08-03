import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import profileReducer from "./profile/profileSlice";
import loaderReducer from "./loaderSlice";
import searchReducer from "./search/searchSlice"
const appReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  profile: profileReducer,
  loader: loaderReducer,
  search: searchReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import loaderReducer from "./loaderSlice";
import adminReducer from "./admin/adminSlice";
import profileReducer from "./profile/profileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  loader: loaderReducer,
  admin: adminReducer,
  profile: profileReducer,
});



export default rootReducer;
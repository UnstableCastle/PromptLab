import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS, http } from "../../api";
import storage from "../../utils/storage";
import { store } from "../store";
import toast from "../../utils/toast";
import { hideLoader, showLoader } from "../loaderSlice";

const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { getState, rejectWithValue, dispatch }) => {
    dispatch(showLoader());
    try {
      const state = getState();
      const response = await http.post(ENDPOINTS.AUTH.LOGIN, credentials);
      if (response.success) {
        toast.success(response.message);
        dispatch(hideLoader());
        if (state.auth.user.rememberMe) {
          await storage.setToken("accessToken", response.data.accessToken);
          await storage.setToken("refreshToken", response.data.refreshToken);
          await localStorage.setItem("username", response.data.username);
        }
        return response.data;
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.response.data.message);
      return rejectWithValue(
        error.response?.data.message || "something went wrong",
      );
    }
  },
);

const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    thunkApi.dispatch(showLoader());
    try {
      const response = await http.post(ENDPOINTS.AUTH.REGISTER, credentials);

      if (response.success) {
        toast.success(response.success);
        await thunkApi.dispatch(hideLoader());
        return response;
      }
    } catch (error) {
      thunkApi.dispatch(hideLoader());
      toast.error(error.response.data.message);
      return thunkApi.rejectWithValue(
        error.response?.data.message || "something went wrong",
      );
    }
  },
);

const forgotPassSendOtp = createAsyncThunk(
  "auth/forgot-pwd",
  async (credentials, thunkApi) => {
    thunkApi.dispatch(showLoader());
    try {
      const response = await http.post(ENDPOINTS.AUTH.FORGOTPASSOTP, null, {
        params: credentials,
      });
      if (response.success) {
        thunkApi.dispatch(hideLoader());
        toast.success(response.message);
        console.log(response, "s=s=s=s=");
        return response;
      }
    } catch (error) {
      thunkApi.dispatch(hideLoader());
      toast.error(error.response.message);

      return thunkApi.rejectWithValue(
        error.response?.data || "something went wrong",
      );
    }
  },
);

const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (credentials, thunkApi) => {
    thunkApi.dispatch(showLoader());
    try {
      const response = await http.post(ENDPOINTS.AUTH.RESETPASSWORD, credentials);
      if (response.success) {
        thunkApi.dispatch(hideLoader());
        toast.success(response.message || "Password reset successfully!");
        return response;
      }
    } catch (error) {
      thunkApi.dispatch(hideLoader());
      
      // ADD THESE CONSOLE LOGS TO SEE THE ACTUAL ERROR IN BROWSER CONSOLE
      console.log("FULL ERROR OBJECT:", error);
      console.log("ERROR RESPONSE DATA:", error.response?.data);
      console.log("ERROR MESSAGE:", error.message);

      toast.error(error.response?.data?.message || error.message || "Something went wrong");
      return thunkApi.rejectWithValue(
        error.response?.data || error.message || "something went wrong",
      );
    }
  },
);

const logoutUser = createAsyncThunk(
  "auth/logout",
  async (credentials, { getState, rejectWithValue, dispatch }) => {
    dispatch(showLoader());
    try {
      const state = getState();
      const response = await http.post(ENDPOINTS.AUTH.LOGOUT, {
        refreshToken: state.auth.refreshToken,
      });
      if (response.success) {
        dispatch(hideLoader());
        toast.success(response.message);
        localStorage.clear();
        console.log(storage.getToken("accessToken"));
        console.log(storage.getToken("refreshToken"));
        return response;
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.response.message);
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  },
);

export { loginUser, forgotPassSendOtp, logoutUser, registerUser, resetPassword };
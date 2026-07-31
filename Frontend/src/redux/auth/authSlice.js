import { createSlice } from "@reduxjs/toolkit";
import { forgotPassSendOtp, loginUser, logoutUser } from "./authThunk";

const UserState = {
  id: "",
  name: "",
  email: "",
  password1: "",
  password2: "",
  rememberMe: false,
};

const initialState = {
  user: UserState,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChangeField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    logout: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user.id = action.payload.Id.toString();
        state.user.name = action.payload.username;
        console.log(action.payload, "s=s=s=s=s=");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassSendOtp.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })

      .addCase(forgotPassSendOtp.fulfilled, (state, action) => {
        state.loading = false;
        console.log("success");
        console.log(action.payload,"s=s=s=s=");

      })
      .addCase(forgotPassSendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("gandesshh");

      });
  },
});

export const { onChangeField, logout } = authSlice.actions;

export default authSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
// Ensure these imports match your actual file structure for API calls!
import { ENDPOINTS, http } from "../../api";
import { hideLoader, showLoader } from "../loaderSlice";

export const followUser = createAsyncThunk(
  "user/followUser",

  async (targetUserId, { rejectWithValue, dispatch }) => {
    dispatch(showLoader());
    try {
      const response = await http.post(ENDPOINTS.USERS.FOLLOW(targetUserId));
      if (response.success) {
        return { targetUserId, data: response.data };
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    } finally {
      dispatch(hideLoader());
    }
  },
);

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (targetUserId, { rejectWithValue, dispatch }) => {
    dispatch(showLoader());
    try {
      const response = await http.delete(
        ENDPOINTS.USERS.UNFOLLOW(targetUserId),
      );
      if (response.success) {
        return { targetUserId, data: response.data };
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    } finally {
      dispatch(hideLoader());
    }
  },
);

export const getPostsByUser = createAsyncThunk(
  "profile/getPostsByUser",
  async ({ id, page, size }, { rejectWithValue }) => {
    console.log(id,"s=====get post data")
    try {
      // FIXED: Removed "/api" to prevent "/api/api/" duplication
      const response = await http.get(
        `/posts/user/${id}/portfolio`,
      );
      console.log(response,"s=s=s=s=s=")
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  },
);

export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async (id, { rejectWithValue }) => {
    try {
      // FIXED: Removed "/api" to prevent "/api/api/" duplication
      const response = await http.get(`/users/${id}`);
      console.log(response,"s=s=s=s=")
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  },
);

import { createAsyncThunk } from "@reduxjs/toolkit";
// Ensure these imports match your actual file structure for API calls!
import { ENDPOINTS, http } from "../../api"; 

export const followUser = createAsyncThunk(
  "user/followUser",
  async (targetUserId, { rejectWithValue }) => {
    try {
      // FIXED: Changed 'api' to 'http' to match your import
      const response = await http.post(`/users/${targetUserId}/follow`);
      return { targetUserId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (targetUserId, { rejectWithValue }) => {
    try {
      // FIXED: Changed 'api' to 'http' to match your import
      const response = await http.delete(`/users/${targetUserId}/unfollow`);
      return { targetUserId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPostsByUser = createAsyncThunk(
  "profile/getPostsByUser",
  async ({ id, page, size }, { rejectWithValue }) => {
    try {
      // FIXED: Removed "/api" to prevent "/api/api/" duplication
      const response = await http.get(`/users/${id}/posts?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async (id, { rejectWithValue }) => {
    try {
      // FIXED: Removed "/api" to prevent "/api/api/" duplication
      const response = await http.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  }
);
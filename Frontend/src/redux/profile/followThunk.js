import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Async thunk to follow a user
export const followUser = createAsyncThunk(
  "user/followUser",
  async (targetUserId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/users/${targetUserId}/follow`);
      return { targetUserId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to unfollow a user
export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (targetUserId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/users/${targetUserId}/unfollow`);
      return { targetUserId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
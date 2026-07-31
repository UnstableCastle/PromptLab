import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS, http } from "../../api";
import { hideLoader, showLoader } from "../loaderSlice";
import toast from "../../utils/toast";

// ======================
// Create Post
// ======================
export const createPost = createAsyncThunk(
  "dashboard/createPost", 
  async (credentials, { rejectWithValue, dispatch }) => {
    dispatch(showLoader());

    try {
      const response = await http.post(ENDPOINTS.POSTS.CREATE, credentials);
      dispatch(hideLoader());

      if (response.data?.success) {
        toast.success(response.data.message);
      }

      return response.data;
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ======================
// Get All Posts
// ======================
export const getAllPosts = createAsyncThunk(
  "dashboard/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(ENDPOINTS.POSTS.GETALL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ======================
// Get Post By Id
// ======================
export const getPostById = createAsyncThunk(
  "dashboard/getPostById",
  async (id, { rejectWithValue, dispatch }) => {
    dispatch(showLoader());

    try {
      const response = await http.get(`${ENDPOINTS.POSTS.GETBYID}/${id}`);
      dispatch(hideLoader());

      if (response.data?.success || response.success) {
        toast.success(response.data?.message || response.message);
      }

      return response.data;
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ======================
// Toggle Upvote 
// ======================
export const toggleUpvote = createAsyncThunk(
  "dashboard/toggleUpvote",
  async (postId, { rejectWithValue }) => {
    try {
      // 1. Explicitly setting the URL to match your @PostMapping
      // 2. Passing an empty body {} which Spring Boot POST requests often require
      await http.post(`/posts/detail/${postId}/upvote`, {});
      
      // Return postId so the slice knows which post to update
      return postId;
    } catch (error) {
      // THE FIX: Actually show the error so you aren't guessing!
      console.error("Upvote API Error from Spring Boot:", error.response || error);
      toast.error(error.response?.data?.message || "Failed to upvote. Check console.");
      
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
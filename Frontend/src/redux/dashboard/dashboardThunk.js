import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS, http } from "../../api";

const createPost = createAsyncThunk(
  "dashboard/create-post",
  async (credentials, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await http.post(ENDPOINTS.POSTS.CREATE, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  }
);

const getAllPosts = createAsyncThunk(
  "dashboard/getAllPosts",
  async (credentials, thunkApi) => {
    try {
      const response = await http.get(ENDPOINTS.POSTS.GETALL);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || "something went wrong",
      );
    }
  }
);

const getPostById = createAsyncThunk(
  "auth/getPostByid",
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.get(ENDPOINTS.POSTS.GETBYID + "/" + id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  }
);

const getPostByUser = createAsyncThunk(
  "auth/postbyuser",
  async (username, { rejectWithValue }) => {
    try {
      const response = await http.get(ENDPOINTS.POSTS.GETBYID + username);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  }
);

const toggleUpvote = createAsyncThunk(
  "dashboard/toggleUpvote",
  async (postId, { rejectWithValue }) => {
    try {
      // Adjust this URL if your specific upvote endpoint is different
      const response = await http.post(`/api/posts/${postId}/upvote`); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  }
);

// All functions exported correctly to prevent SyntaxErrors
export { createPost, getAllPosts, getPostById, getPostByUser, toggleUpvote };
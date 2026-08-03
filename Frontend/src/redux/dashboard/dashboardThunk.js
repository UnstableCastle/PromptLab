import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS, http } from "../../api";
import { hideLoader, showLoader } from "../loaderSlice";
import toast from "../../utils/toast";

const createPost = createAsyncThunk(
  "post/create",
  async (credentials, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await http.post(ENDPOINTS.POSTS.CREATE, credentials);
      if (response.success) {
        return response;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  },
);

const sumbitPost = createAsyncThunk(
  "post/submit",
  async ({ id, payload }, { rejectWithValue, dispatch }) => {
    dispatch(showLoader());
    try {
      dispatch(hideLoader());
      const response = await http.put(ENDPOINTS.POSTS.SUBMIT(id), payload, {
        header: {},
      });
      if (response.success) {
        toast.success(response.message);
        return response;
      }
    } catch (error) {
      dispatch(hideLoader());
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  },
);

//DONE = pagination pending
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
  },
);

// DONE
const getPostById = createAsyncThunk(
  "dashboard/getPostById",
  async (id, { rejectWithValue, dispatch }) => {
    dispatch(showLoader());
    try {
      const response = await http.get(ENDPOINTS.POSTS.GETBYID + "/" + id);
      if (response.success) {
        dispatch(hideLoader());
        toast.success(response.message);
        return response.data;
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.response.data.message);
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  },
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
  },
);

const toggleUpvote = createAsyncThunk(
  "dashboard/toggleUpvote",
  async (postId, { rejectWithValue }) => {
    try {
      // Adjust this URL if your specific upvote endpoint is different
      const response = await http.post(`/posts/${postId}/upvote`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  },
);

export {
  createPost,
  getAllPosts,
  getPostById,
  sumbitPost,
  toggleUpvote,
  getPostByUser,
};

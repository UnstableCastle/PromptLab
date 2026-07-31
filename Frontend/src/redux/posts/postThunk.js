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
  },
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
  },
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
  },
);
const getPostByUser = createAsyncThunk(
  "auth/postbyuser",
  async (username, { rejectWithValue }) => {
    try {
      const response = await http.get(ENDPOINTS.POSTS.GETBYID + username);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("here we areee", error);
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  },
);

export { createPost, getAllPosts, getPostById, getPostByUser };

import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS, http } from "../../api";
import { hideLoader, showLoader } from "../loaderSlice";
import toast from "../../utils/toast";

const getUserDetails = createAsyncThunk(
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

const getPostsByUser = createAsyncThunk(
  "dashboard/getPostByUser",
  // Update the parameter to accept an object so you can pass page/size
  async ({ id, page = 0, size = 10 }, thunkApi) => {
    thunkApi.dispatch(showLoader());
    try {
      // Pass the pagination parameters to the endpoint
      const response = await http.get(ENDPOINTS.POSTS.POSTBYUSERID(id), {
        params: { page, size }
      });
      
      thunkApi.dispatch(hideLoader());
      
      // Return the data directly. Spring Boot's Page object is now inside response.data
      return response.data; 
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user posts");
      thunkApi.dispatch(hideLoader());
      return thunkApi.rejectWithValue(
        error.response?.data || "something went wrong"
      );
    }
  },
);

export { getPostsByUser };

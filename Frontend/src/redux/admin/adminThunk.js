import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS, http } from "../../api";
import toast from "../../utils/toast";
import { showLoader, hideLoader } from "../loaderSlice";

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, thunkApi) => {
    thunkApi.dispatch(showLoader());

    try {
      const response = await http.get(ENDPOINTS.USERS.GET_ALL);

      thunkApi.dispatch(hideLoader());

      if (response.success) {
        return response.data;
      }

      return thunkApi.rejectWithValue(response.message);
    } catch (error) {
      thunkApi.dispatch(hideLoader());

      toast.error(
        error.response?.data?.message || "Failed to fetch users"
      );

      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS, http } from "../../api";
import { hideLoader, showLoader } from "../loaderSlice"; // adjust this import if needed based on your structure
import toast from "../../utils/toast";
import { getPostsByUser } from "../profile/profileThunk";

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
  }
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
  }
);

const deletePost = createAsyncThunk(
  "post/delete",
  async (id, { rejectWithValue, dispatch, getState }) => {
    const state = getState()
    const { user } = state.auth
    dispatch(showLoader());
    try {
      dispatch(hideLoader());
      const response = await http.delete(ENDPOINTS.POSTS.DELETEPOST(id));
      if (response.success) {
        toast.success(response.message);
        return response;
      }
    } catch (error) {
      dispatch(hideLoader());
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
  async (postDet, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState()
      const response = await http.post(ENDPOINTS.POSTS.TOGGLE_UPVOTE(postDet.id));
      if (response.success) {
        const { id, name } = state.auth

        if (postDet.route === "dashboard") {
          dispatch(getAllPosts())
        }
        if (postDet.route === "postdetails") {
          dispatch(getPostById(postDet.id))
        }
        if (postDet.route === "profile") {
          dispatch(getPostByUser(name))
        }
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || "something went wrong");
    }
  }
);

// THE FIX: Added your missing download function back!
const downloadPostAttachment = createAsyncThunk(
  "post/download",
  async (attachmentUrl, { rejectWithValue }) => {
    console.log(attachmentUrl, "s==s=s=s=");
    const relativePath = attachmentUrl
      .replace(/^\/uploads\//, "")
      .split("/")
      .map(encodeURIComponent)
      .join("/");
    console.log(relativePath, "s=============RELATEIVE PATH========");
    try {
      const blob = await http.get(`/posts/download/${relativePath}`, {
        responseType: "blob",
      });

      return {
        blob,
        fileName: attachmentUrl.split("/").pop(),
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  sumbitPost,
  toggleUpvote,
  getPostByUser,
  downloadPostAttachment, // THE FIX: Exported it here
};
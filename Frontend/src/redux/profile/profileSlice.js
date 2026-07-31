import { createSlice } from "@reduxjs/toolkit";
import { getPostsByUser } from "./profileThunk";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    myPosts: [],         // Renders on personal dashboard
    viewedUserPosts: [], // Renders on public user profiles
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // We removed the getMyPosts.fulfilled case entirely
      .addCase(getPostsByUser.fulfilled, (state, action) => {
        state.viewedUserPosts = action.payload.content || []; 
      });
  },
});

export default profileSlice.reducer;
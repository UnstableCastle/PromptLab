import { createSlice } from "@reduxjs/toolkit";
// 1. Added toggleUpvote to the import
import { getAllPosts, getPostById, toggleUpvote } from "./dashboardThunk";

const initialState = {
  post: {}, // Changed to an empty object to accept the dynamic backend structure
  allPosts: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts = action.payload.content;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false;
        // The Fix: Just store the exact data from Spring Boot!
        // No manual mapping needed.
        state.post = action.payload; 
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 2. Added cases for toggleUpvote
      .addCase(toggleUpvote.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        
        // Update the upvote count in the allPosts array
        const postIndex = state.allPosts.findIndex((p) => p.id === updatedPost.id);
        if (postIndex !== -1) {
          state.allPosts[postIndex] = { ...state.allPosts[postIndex], ...updatedPost };
        }

        // If the user is currently viewing this post in the Dialog, update it there too
        if (state.post?.id === updatedPost.id) {
          state.post = { ...state.post, ...updatedPost };
        }
      });
  },
});

export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts, getPostById, toggleUpvote } from "./dashboardThunk";

const initialState = {
  post: {}, 
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
        state.post = action.payload; 
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleUpvote.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        
        const postIndex = state.allPosts.findIndex((p) => p.id === updatedPost.id);
        if (postIndex !== -1) {
          state.allPosts[postIndex] = { ...state.allPosts[postIndex], ...updatedPost };
        }

        if (state.post?.id === updatedPost.id) {
          state.post = { ...state.post, ...updatedPost };
        }
      });
  },
});

export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer;
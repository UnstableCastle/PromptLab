import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts, getPostById, toggleUpvote } from "./dashboardThunk";

const initialState = {
  post: {}, 
  allPosts: [],
  mypost: [],
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
      
      // ======================
      // Optimistic UI for Upvotes
      // ======================
      .addCase(toggleUpvote.pending, (state, action) => {
        const postId = action.meta.arg;
        
        // 1. Update in allPosts array
        const postIndex = state.allPosts.findIndex((p) => p.id === postId);
        if (postIndex !== -1) {
          const wasLiked = state.allPosts[postIndex].hasUpvoted;
          state.allPosts[postIndex].hasUpvoted = !wasLiked;
          state.allPosts[postIndex].upvoteCount += wasLiked ? -1 : 1;
        }

        // 2. Update in mypost array (if they are stored there too)
        const myPostIndex = state.mypost.findIndex((p) => p.id === postId);
        if (myPostIndex !== -1) {
          const wasLiked = state.mypost[myPostIndex].hasUpvoted;
          state.mypost[myPostIndex].hasUpvoted = !wasLiked;
          state.mypost[myPostIndex].upvoteCount += wasLiked ? -1 : 1;
        }

        // 3. Update the single post view (if opened in details modal)
        if (state.post?.id === postId) {
          const wasLiked = state.post.hasUpvoted;
          state.post.hasUpvoted = !wasLiked;
          state.post.upvoteCount += wasLiked ? -1 : 1;
        }
      })
      // Revert if API fails
      .addCase(toggleUpvote.rejected, (state, action) => {
        const postId = action.meta.arg;
        
        const postIndex = state.allPosts.findIndex((p) => p.id === postId);
        if (postIndex !== -1) {
          const isCurrentlyLiked = state.allPosts[postIndex].hasUpvoted;
          state.allPosts[postIndex].hasUpvoted = !isCurrentlyLiked;
          state.allPosts[postIndex].upvoteCount += isCurrentlyLiked ? -1 : 1;
        }

        const myPostIndex = state.mypost.findIndex((p) => p.id === postId);
        if (myPostIndex !== -1) {
          const isCurrentlyLiked = state.mypost[myPostIndex].hasUpvoted;
          state.mypost[myPostIndex].hasUpvoted = !isCurrentlyLiked;
          state.mypost[myPostIndex].upvoteCount += isCurrentlyLiked ? -1 : 1;
        }
        
        if (state.post?.id === postId) {
          const isCurrentlyLiked = state.post.hasUpvoted;
          state.post.hasUpvoted = !isCurrentlyLiked;
          state.post.upvoteCount += isCurrentlyLiked ? -1 : 1;
        }
        
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
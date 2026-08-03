import { createSlice } from "@reduxjs/toolkit";
import { getPostsByUser, getUserProfile, followUser, unfollowUser } from "./profileThunk";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    myPosts: [],         
    viewedUserPosts: [], 
    viewedUser: null,    
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsByUser.fulfilled, (state, action) => {
        // Logging the structure to see why posts aren't rendering
        console.log("Raw Post Data from Backend:", action.payload);
        const data = action.payload?.data || action.payload;
        const postsArray = data?.content || data || [];
        // console.log("What Redux is trying to save:", postsArray);
        state.viewedUserPosts = Array.isArray(postsArray) ? postsArray : []; 
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        const userData = action.payload?.data || action.payload;
        state.viewedUser = userData; 
      })
      .addCase(followUser.fulfilled, (state) => {
        if (state.viewedUser) {
          state.viewedUser.followedByCurrentUser = true;
          state.viewedUser.followersCount = (state.viewedUser.followersCount || 0) + 1;
        }
      })
      .addCase(unfollowUser.fulfilled, (state) => {
        if (state.viewedUser) {
          state.viewedUser.followedByCurrentUser = false;
          state.viewedUser.followersCount = Math.max(0, (state.viewedUser.followersCount || 1) - 1);
        }
      });
  },
});

export default profileSlice.reducer;
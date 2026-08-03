import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 

// 1. The Search Thunk: Pulls the correct 'accessToken' from Redux state
export const searchThunk = createAsyncThunk(
  "search/fetchResults",
  async (keyword, { getState, rejectWithValue }) => {
    try {
      // Access the token directly from the Redux auth state
      const state = getState();
      const token = state.auth.accessToken;

      // Fallback: If you also persist it in localStorage under 'accessToken'
      // const token = localStorage.getItem("accessToken");

      const response = await axios.get(`http://localhost:8081/api/posts/search`, {
        params: { keyword },
        headers: {
          Authorization: `Bearer ${token}` // This will now send a valid token!
        }
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch search results"
      );
    }
  }
);

// 2. The Slice: Handles the React state
const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(searchThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload?.data.content || []; 
      })
      .addCase(searchThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBlogs: [],
};

const blogSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateBlogs: (state, action) => {
      state.allBlogs = action.payload;
    },
    resetBlogs: () => initialState,
  },
});

export const { updateBlogs, resetBlogs } = blogSlice.actions;

export default blogSlice.reducer;

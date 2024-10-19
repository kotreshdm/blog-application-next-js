import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBlogs: [],
  selectedBlog: {},
  loading: false,
  addEditBlogDialog: false,
  viewBlogDialog: false,
};

const blogSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateBlogs: (state, action) => {
      state.allBlogs = action.payload;
    },
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    setAddEditBlogDialog: (state, action) => {
      state.addEditBlogDialog = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setViewBlogDialog: (state, action) => {
      state.viewBlogDialog = action.payload;
    },
    resetBlogs: () => initialState,
    closeAllBlogsDialogs: (state) => {
      state.loading = false;
      state.addEditBlogDialog = false;
    },
  },
});

export const {
  updateBlogs,
  setSelectedBlog,
  setAddEditBlogDialog,
  setLoading,
  resetBlogs,
  closeAllBlogsDialogs,
  setViewBlogDialog,
} = blogSlice.actions;

export default blogSlice.reducer;

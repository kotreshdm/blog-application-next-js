import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBlogs: [],
  categories: [],
  loading: false,
  dataReloadTime: 0,
};

const publicDataSlice = createSlice({
  name: "publicData",
  initialState,
  reducers: {
    fetchingBlogs: (state) => {
      state.loading = true;
      state.allBlogs = [];
    },

    updateBlogs: (state, action) => {
      state.loading = false;
      state.allBlogs = action.payload;
      state.dataReloadTime = new Date().getTime();
    },
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetBlogs: () => initialState,
  },
});

export const {
  fetchingBlogs,
  updateBlogs,
  updateCategories,
  setLoading,
  resetBlogs,
} = publicDataSlice.actions;

export default publicDataSlice.reducer;

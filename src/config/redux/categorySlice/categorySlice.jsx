import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategories: [],
};

const categorySlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.allCategories = action.payload;
    },
    reset: () => initialState,
  },
});

export const { updateCategories, reset } = categorySlice.actions;

export default categorySlice.reducer;

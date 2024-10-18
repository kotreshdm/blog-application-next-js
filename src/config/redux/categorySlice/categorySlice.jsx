import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategories: [],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.allCategories = action.payload;
    },
    resetCategories: () => initialState,
  },
});

export const { updateCategories, resetCategories } = categorySlice.actions;

export default categorySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategories: [],
  selectedCategory: {},
  addEditCategoryDialog: false,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.allCategories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setAddEditCategoryDialog: (state, action) => {
      state.addEditCategoryDialog = action.payload;
    },
    resetCategories: () => initialState,
  },
});

export const {
  updateCategories,
  setSelectedCategory,
  setAddEditCategoryDialog,
  resetCategories,
} = categorySlice.actions;

export default categorySlice.reducer;

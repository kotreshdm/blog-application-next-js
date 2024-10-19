import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategories: [],
  selectedCategory: {},
  addEditCategoryDialog: false,
  loading: false,
  error: null,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetCategories: () => initialState,
    closeAllCategoriesDialogs: (state) => {
      state.loading = false;
      state.addEditCategoryDialog = false;
    },
  },
});

export const {
  updateCategories,
  setSelectedCategory,
  setAddEditCategoryDialog,
  resetCategories,
  setLoading,
  setError,
  closeAllCategoriesDialogs,
} = categorySlice.actions;

export default categorySlice.reducer;

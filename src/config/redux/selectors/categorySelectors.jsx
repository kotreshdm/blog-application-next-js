import { createSelector } from "@reduxjs/toolkit";

const selectCategoryState = (state) => state.category;

export const categoryDetails = createSelector(
  [selectCategoryState],
  (pipeline) => ({
    allCategories: pipeline.allCategories,
    caategoryCount: pipeline.allCategories.length,
  })
);

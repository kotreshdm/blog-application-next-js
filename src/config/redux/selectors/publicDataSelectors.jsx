import { createSelector } from "@reduxjs/toolkit";

const selectPublicDataState = (state) => state.publicData;

export const publicData = createSelector(
  [selectPublicDataState],
  (pipeline) => ({
    allBlogs: pipeline.allBlogs,
    loading: pipeline.loading,
    dataReloadTime: pipeline.dataReloadTime,
    categories: pipeline.categories,
  })
);

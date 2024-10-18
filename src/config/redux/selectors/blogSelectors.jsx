import { createSelector } from "@reduxjs/toolkit";

const selectBlogState = (state) => state.blogs;

export const blogDetails = createSelector([selectBlogState], (pipeline) => ({
  allBlogs: pipeline.allBlogs,
  allBlogsCount: pipeline.allBlogs?.length,
}));

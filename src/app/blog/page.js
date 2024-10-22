"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Container } from "@mui/material";
import apiService from "@/utils/api";
import { publicData } from "@/config/redux/selectors/publicDataSelectors";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingBlogs,
  updateBlogs,
} from "@/config/redux/publicContent/publicDataSlice";
import CenteredLoading from "@/components/centeredLoading/CenteredLoading";
import CategoriesNavBar from "@/components/publicBlog/CategoriesNavBar";
import { useSearchParams } from "next/navigation";

const BlogPage = () => {
  const { allBlogs, loading, dataReloadTime } = useSelector(publicData);
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setCategory(searchParams.get("category"));
  }, [searchParams]);

  useEffect(() => {
    if (category) {
      setFilteredBlogs(allBlogs.filter((blog) => blog.category === category));
    } else {
      setFilteredBlogs(allBlogs);
    }
  }, [allBlogs, category]);

  const filterBlogs = () => {
    console.log("category", category);
    console.log("allBlogs", allBlogs);
    if (category) {
      setFilteredBlogs(
        allBlogs.filter((blog) => blog.category === category._id)
      );
    } else {
      setFilteredBlogs(allBlogs);
    }
  };

  useEffect(() => {
    const currentTime = new Date().getTime();
    if (
      allBlogs.length === 0 ||
      currentTime - dataReloadTime > 120 * 60 * 1000 ||
      true
    ) {
      fetchBlogs();
    } else {
      filterBlogs();
    }
  }, []);

  const fetchBlogs = async () => {
    dispatch(fetchingBlogs());
    const res = await apiService.get("/public/blogs");
    dispatch(updateBlogs(res.data));
    filterBlogs();
  };

  return (
    <Container sx={{ textAlign: "center", marginTop: "10px" }}>
      <CategoriesNavBar />
      {loading ? (
        <CenteredLoading />
      ) : (
        filteredBlogs.map((blog) => <div key={blog._id}>{blog.name}</div>)
      )}
    </Container>
  );
};

export default BlogPage;

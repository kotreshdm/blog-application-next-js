"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Pagination,
  Typography,
} from "@mui/material";
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
import BlogDisplay from "@/components/BlogDisplay/BlogDisplay";

const BlogPage = () => {
  const { allBlogs, loading, dataReloadTime } = useSelector(publicData);
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const perPagePosts = 9;
  const dispatch = useDispatch();

  useEffect(() => {
    const currentTime = new Date().getTime();
    if (
      allBlogs.length === 0 ||
      currentTime - dataReloadTime > 120 * 60 * 1000 ||
      true
    ) {
      fetchBlogs();
    }
  }, []);

  useEffect(() => {
    setCategory(searchParams.get("category"));
    setPageNumber(parseInt(searchParams.get("page") || "1", 10));
  }, [searchParams]);

  const filterBlogs = () => {
    if (category) {
      setFilteredBlogs(
        allBlogs.filter((blog) => blog.category === category._id)
      );
    } else {
      setFilteredBlogs(allBlogs);
    }
  };

  useEffect(() => {
    if (category) {
      setFilteredBlogs(allBlogs.filter((blog) => blog.category === category));
    } else {
      setFilteredBlogs(allBlogs);
    }
  }, [allBlogs, category]);

  const setPageChange = (value) => {
    console.log("value", value);
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  const fetchBlogs = async () => {
    dispatch(fetchingBlogs());
    const res = await apiService.get("/public/blogs");
    dispatch(updateBlogs(res.data));
    filterBlogs();
  };

  return (
    <Container
      sx={{
        textAlign: "center",
        marginTop: "10px",
      }}
    >
      <CategoriesNavBar />
      {loading ? (
        <CenteredLoading />
      ) : (
        <Box>
          {filteredBlogs
            .slice((pageNumber - 1) * perPagePosts, pageNumber * perPagePosts)
            .map((blog, index) => (
              <BlogDisplay key={blog._id} blog={blog} />
            ))}
        </Box>
      )}
      {Math.ceil(filteredBlogs.length / perPagePosts) > 1 && (
        <Pagination
          sx={{
            textAlign: "center",
            position: "sticky",
            display: "flex",
            justifyContent: "center",
            bottom: 0,
            backgroundColor: "background.paper",
            py: 2,
          }}
          count={Math.ceil(filteredBlogs.length / perPagePosts)}
          page={pageNumber}
          onChange={(event, value) => setPageChange(value)}
        />
      )}
    </Container>
  );
};

export default BlogPage;

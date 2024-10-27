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
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
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
import BlogDisplay from "@/components/publicBlog/BlogDisplay/BlogDisplay";

const BlogPage = () => {
  const { allBlogs, loading, dataReloadTime } = useSelector(publicData);
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const perPagePosts = 8;
  const dispatch = useDispatch();

  useEffect(() => {
    const currentTime = new Date().getTime();
    if (
      allBlogs.length === 0 ||
      currentTime - dataReloadTime > 120 * 60 * 1000
    ) {
      fetchBlogs();
    } else {
      fetchOffline();
    }
  }, []);
  const fetchOffline = async () => {
    const res = await apiService.get("/public/blogs");
    setTimeout(() => {
      dispatch(updateBlogs(res.data));
    }, 3000);
  };
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
    <Box
      sx={{
        padding: "0 15px 15px",
      }}
    >
      <CategoriesNavBar />
      {loading ? (
        <CenteredLoading />
      ) : (
        <Box
          display='grid'
          gridTemplateColumns={{
            xs: "1fr", // 1 column for mobile (extra-small devices)
            sm: "1fr", // 1 column for tablets (small devices)
            md: "1fr 1fr", // 2 columns for laptops (medium devices)
            lg: "1fr 1fr", // 2 columns for desktops (large devices)
            xl: "1fr 1fr", // 2 columns for extra-large screens
          }}
          gap={3} // Gap between the items
          sx={{ mt: 3, mb: 3 }}
        >
          {filteredBlogs
            .slice((pageNumber - 1) * perPagePosts, pageNumber * perPagePosts)
            .map((blog, index) => (
              <Box key={blog._id}>
                <BlogDisplay blog={blog} />
              </Box>
            ))}
        </Box>
      )}
      {Math.ceil(filteredBlogs.length / perPagePosts) > 1 && (
        <>
          <Box
            sx={{
              position: "sticky",
              display: "flex",
              justifyContent: "end",
              bottom: 0,
              backgroundColor: "background.paper",
              p: 2,
            }}
          >
            {Math.ceil(filteredBlogs.length / perPagePosts) > 30 && (
              <>
                <Typography variant='body2' sx={{ mr: 1 }}>
                  Go to page:
                </Typography>
                <Select
                  value={pageNumber}
                  onChange={(event) => setPageChange(event.target.value)}
                  size='small'
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "right",
                    },
                    transformOrigin: {
                      vertical: "bottom",
                      horizontal: "right",
                    },
                  }}
                  sx={{ padding: "0 10px", margin: "0" }}
                >
                  {Array.from(
                    {
                      length: Math.ceil(
                        filteredBlogs.length / (perPagePosts * 5)
                      ),
                    },
                    (_, index) => (
                      <MenuItem key={(index + 1) * 5} value={(index + 1) * 5}>
                        {(index + 1) * 5}
                      </MenuItem>
                    )
                  )}
                </Select>
              </>
            )}
            <Pagination
              count={Math.ceil(filteredBlogs.length / perPagePosts)}
              page={pageNumber}
              onChange={(event, value) => setPageChange(value)}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default BlogPage;

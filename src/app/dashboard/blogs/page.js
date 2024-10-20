"use client";
import {
  setAddEditBlogDialog,
  setSelectedBlog,
  updateBlogs,
} from "@/config/redux/blogSlice/blogSlice";
import { blogDetails } from "@/config/redux/selectors/blogSelectors";
import { categoryDetails } from "@/config/redux/selectors/categorySelectors";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Blogs = () => {
  const {
    allBlogs,
    selectedBlog,
    addEditBlogDialog,
    viewBlogDialog,
    lastGridPage,
  } = useSelector(blogDetails);
  const { allCategories } = useSelector(categoryDetails);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  useEffect(() => {
    if (!allBlogs.length) {
      fetchBlogs();
    }
    if (!allCategories.length) {
      fetchCategories(dispatch);
    }
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("/blogs", {});
      if (!response.status === 200) {
        throw new Error("Failed to fetch blogs");
      }
      dispatch(updateBlogs(response.data.blogs));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddBlog = () => {
    dispatch(setAddEditBlogDialog(true));
    dispatch(setSelectedBlog({}));
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          paddingBottom: "10px",
          backgroundColor: "background.paper",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {addEditBlogDialog ? (
          <Typography variant='h4' sx={{ mt: 2, p: 0 }}>
            {selectedBlog._id
              ? `Edit Blog : ${selectedBlog.name.slice(0, 50)} ${
                  selectedBlog.name.length > 50 ? "..." : ""
                } `
              : `Adding new blog...`}
          </Typography>
        ) : (
          <Typography variant='h4' sx={{ mt: 2, p: 0 }}>
            Blogs
          </Typography>
        )}
        {!addEditBlogDialog && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => fetchBlogs()}
              sx={{ textTransform: "capitalize" }}
              startIcon={<RefreshIcon />}
            >
              Refresh
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={handleAddBlog}
              sx={{ textTransform: "capitalize" }}
            >
              Add Blog
            </Button>
          </Box>
        )}
      </div>
      {/* 
      {loading ? (
        <CenteredLoading />
      ) : addEditBlogDialog ? (
        <AddEditBlog />
      ) : (
        <MyTable
          columnDefs={columnDefs}
          data={allBlogs}
          defaultPage={lastGridPage}
          updateLastGridPage={updateLastGridPage}
        />
      )}
      <Dialog
        fullWidth
        maxWidth='sm'
        open={openDeleteConfirmation}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete <b> {selectedBlog?.name} </b>?
          </DialogContentText>
          <DialogContentText id='alert-dialog-description'>
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteConfirmation(false);
              dispatch(setSelectedBlog({}));
            }}
            color='primary'
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color='primary' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {viewBlogDialog && <ViewBlog />} */}
    </div>
  );
};

export default Blogs;

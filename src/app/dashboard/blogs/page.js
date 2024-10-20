"use client";
import MyTable from "@/components/dashboard/AgGridTable";
import {
  setAddEditBlogDialog,
  setLastGridPage,
  setSelectedBlog,
  setViewBlogDialog,
  updateBlogs,
} from "@/config/redux/blogSlice/blogSlice";
import { blogDetails } from "@/config/redux/selectors/blogSelectors";
import { categoryDetails } from "@/config/redux/selectors/categorySelectors";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CenteredLoading from "@/components/centeredLoading/CenteredLoading";
import ViewBlog from "@/components/dashboard/blog/ViewBlog";
import toast from "react-hot-toast";
import apiService from "@/utils/api";
import AddEditBlog from "@/components/dashboard/blog/AddEditBlog";

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
  const [allCategoriesWithDetails, setAllCategoriesWithDetails] = useState([]);
  useEffect(() => {
    if (!allBlogs.length) {
      fetchBlogs();
    }
    if (!allCategories.length) {
      fetchCategories(dispatch);
    }
  }, []);

  const getBlogById = async (id) => {
    const response = await apiService.get(`/blogs?id=${id}`);
    if (response.data.success) {
      setAllCategoriesWithDetails([
        response.data.blog,
        ...allCategoriesWithDetails,
      ]);
      dispatch(setSelectedBlog(response.data.blog));
    }
  };

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
  const updateLastGridPage = (page) => {
    dispatch(setLastGridPage(page));
  };

  const ButtonCellRenderer = (params) => {
    const handleDelete = () => {
      setOpenDeleteConfirmation(true);
      dispatch(setSelectedBlog(params.data));
    };
    const handleEdit = () => {
      if (params.data._id !== selectedBlog._id) {
        const findBlog = allCategoriesWithDetails.find(
          (blog) => blog._id === params.data._id
        );
        if (findBlog) {
          dispatch(setSelectedBlog(findBlog));
        } else {
          getBlogById(params.data._id);
        }
      }
      dispatch(setAddEditBlogDialog(true));
    };
    const handleView = () => {
      if (params.data._id !== selectedBlog._id) {
        const findBlog = allCategoriesWithDetails.find(
          (blog) => blog._id === params.data._id
        );
        if (findBlog) {
          dispatch(setSelectedBlog(findBlog));
        } else {
          getBlogById(params.data._id);
        }
      }
      dispatch(setViewBlogDialog(true));
    };

    return (
      <Stack direction='row' spacing={1}>
        <IconButton onClick={handleView} size='small' color='primary'>
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={handleEdit} size='small' color='primary'>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete} size='small' color='error'>
          <DeleteIcon />
        </IconButton>
      </Stack>
    );
  };

  const columnDefs = [
    {
      headerName: "Name",
      valueGetter: (p) => p.data.name,
      flex: 1,
    },
    {
      field: "Description",
      valueFormatter: (p) => p.data.description,
      flex: 1,
    },

    {
      field: "category",
      valueFormatter: (p) => {
        const category = allCategories.find(
          (cat) => cat._id === p.data.category
        );
        return category ? category.name : "Unknown";
      },
      flex: 1,
    },
    {
      field: "shortDescription",
      valueFormatter: (p) => {
        return p.data.shortDescription;
      },
      flex: 1,
    },
    {
      field: "seoDescription",
      valueFormatter: (p) => {
        return p.data.seoDescription;
      },
      flex: 1,
    },
    {
      field: "seoKeyword",
      valueFormatter: (p) => {
        return p.data.seoKeyword;
      },
      flex: 1,
    },
    {
      field: "updatedAt",
      valueFormatter: (p) => {
        return new Date(p.data.updatedAt).toLocaleDateString();
      },
      flex: 1,
    },
    {
      field: "status",
      valueFormatter: (p) => {
        return p.data.status === "active" ? "🟢" : "🔴";
      },
      flex: 1,
    },

    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ButtonCellRenderer,
      flex: 2,
    },
  ];

  const handleConfirmDelete = async () => {
    try {
      const response = await apiService.delete(`/blogs?id=${selectedBlog._id}`);
      if (response.data.success) {
        setOpenDeleteConfirmation(false);
        dispatch(
          updateBlogs(allBlogs.filter((blog) => blog._id !== selectedBlog._id))
        );
        dispatch(setSelectedBlog({}));
        toast.success(response.data.message);
      } else {
        throw new Error(response.message || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error(error.message || "Failed to delete post");
    }
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
      {loading && <CenteredLoading />}

      {!loading && allBlogs.length && !addEditBlogDialog && (
        <MyTable
          columnDefs={columnDefs}
          data={allBlogs}
          defaultPage={lastGridPage}
          updateLastGridPage={updateLastGridPage}
        />
      )}
      {addEditBlogDialog && (
        <Box sx={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
          <AddEditBlog />
        </Box>
      )}
      {viewBlogDialog && <ViewBlog />}

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
    </div>
  );
};

export default Blogs;

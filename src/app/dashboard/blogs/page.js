"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MyTable from "@/components/dashboard/AgGridTable";
import { useCallback, useEffect, useState } from "react";
import AddEditBlog from "@/components/dashboard/blog/AddEditBlog";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import apiService from "@/utils/api";
import toast from "react-hot-toast";
import CenteredLoading from "@/components/centeredLoading/CenteredLoading";
import { useDispatch, useSelector } from "react-redux";
import { blogDetails } from "@/config/redux/selectors/blogSelectors";
import {
  closeAllBlogsDialogs,
  setAddEditBlogDialog,
  setSelectedBlog,
  setViewBlogDialog,
  updateBlogs,
} from "@/config/redux/blogSlice/blogSlice";
import { categoryDetails } from "@/config/redux/selectors/categorySelectors";
import ViewBlog from "@/components/dashboard/blog/ViewBlog";

function Blogs() {
  const { allBlogs, selectedBlog, addEditBlogDialog, viewBlogDialog } =
    useSelector(blogDetails);
  const { allCategories } = useSelector(categoryDetails);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  useEffect(() => {
    dispatch(closeAllBlogsDialogs());
    if (!allBlogs.length) {
      fetchBlogs();
    }
    if (!allCategories.length) {
      fetchCategories(dispatch);
    }
  }, []);
  const ButtonCellRenderer = useCallback((params) => {
    const handleDelete = () => {
      setOpenDeleteConfirmation(true);
      dispatch(setSelectedBlog(params.data));
    };
    const handleEdit = () => {
      dispatch(setAddEditBlogDialog(true));
      dispatch(setSelectedBlog(params.data));
    };
    const handleView = () => {
      dispatch(setSelectedBlog(params.data));
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
      field: "Image",
      cellRenderer: (params) => {
        const value = params.data.image;
        if (value) {
          return (
            <img
              src={`data:image/jpeg;base64,${Buffer.from(value).toString(
                "base64"
              )}`}
              alt='Category'
              style={{ width: "auto", height: "50px", objectFit: "cover" }}
            />
          );
        }
        return "No Image";
      },
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
      field: "seoTitle",
      valueFormatter: (p) => {
        return p.data.seoTitle;
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

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1>Blogs</h1>
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
          {!addEditBlogDialog && !openDeleteConfirmation && (
            <Button
              variant='contained'
              color='primary'
              onClick={handleAddBlog}
              sx={{ textTransform: "capitalize" }}
            >
              {selectedBlog?._id ? "Edit Blog" : "Add Blog"}
            </Button>
          )}
        </Box>
      </div>
      {!loading && addEditBlogDialog && <AddEditBlog />}
      {loading ? (
        <CenteredLoading />
      ) : (
        <MyTable columnDefs={columnDefs} data={allBlogs} />
      )}
      <Dialog
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
      {viewBlogDialog && <ViewBlog />}
    </div>
  );
}

export default Blogs;

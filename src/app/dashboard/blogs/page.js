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
import DeleteIcon from "@mui/icons-material/Delete";
import apiService from "@/utils/api";
import toast from "react-hot-toast";
import CenteredLoading from "@/components/centeredLoading/CenteredLoading";
import { useDispatch, useSelector } from "react-redux";
import { blogDetails } from "@/config/redux/selectors/blogSelectors";
import { updateBlogs } from "@/config/redux/blogSlice/blogSlice";
import { categoryDetails } from "@/config/redux/selectors/categorySelectors";
import { updateCategories } from "@/config/redux/categorySlice/categorySlice";

function Category() {
  const { allBlogs } = useSelector(blogDetails);
  const { allCategories } = useSelector(categoryDetails);
  const dispatch = useDispatch();
  const [category, setCategory] = useState({});
  const [selectedBlog, setSelectedBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  useEffect(() => {
    if (!allBlogs.length) {
      fetchBlogs();
    }
    if (!allCategories.length) {
      fetchCategories();
    }
  }, []);
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("/categories", {});
      if (!response.status === 200) {
        throw new Error("Failed to fetch categories");
      }

      dispatch(updateCategories(response.data.categories));
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };
  const ButtonCellRenderer = useCallback((params) => {
    const handleDelete = () => {
      setOpenDeleteConfirmation(true);
      setSelectedBlog(params.data);
    };
    const handleEdit = () => {
      setOpen(true);
      setSelectedBlog(params.data);
    };
    return (
      <Stack direction='row' spacing={1}>
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
    setOpen(true);
    setSelectedBlog({});
  };
  const handleCancel = useCallback(() => {
    setOpen(false);
    setSelectedBlog({});
  }, []);
  const handleBlogAdd = (newPost) => {
    dispatch(updateBlogs([newPost, ...allBlogs]));
  };
  const handleBlogEdit = (newPost) => {
    const updatedBlog = allBlogs.map((post) =>
      post._id === newPost._id ? newPost : post
    );
    dispatch(updateBlogs(updatedBlog));
    setCategory({});
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await apiService.delete(
        `/categories?id=${category._id}`
      );
      if (response.data.success) {
        dispatch(
          updateCategories(
            allCategories.filter((cat) => cat._id !== category._id)
          )
        );
        setOpenDeleteConfirmation(false);
        setCategory({});
        toast.success(`${category.name} deleted successfully`);
      } else {
        throw new Error(response.message || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(error.message || "Failed to delete category");
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
      headerName: "Actions",
      field: "actions",
      cellRenderer: ButtonCellRenderer,
      flex: 1,
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
          {!open && !openDeleteConfirmation && (
            <Button
              variant='contained'
              color='primary'
              onClick={handleAddBlog}
              sx={{ textTransform: "capitalize" }}
            >
              {category._id ? "Edit Blog" : "Add Blog"}
            </Button>
          )}
        </Box>
      </div>
      {!loading && open && (
        <AddEditBlog
          isOpen={open}
          selected={selectedBlog}
          onClose={handleCancel}
          onBlogAdd={handleBlogAdd}
          onBlogEdit={handleBlogEdit}
        />
      )}
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
            Are you sure you want to delete <b> {category.name} </b>?
          </DialogContentText>
          <DialogContentText id='alert-dialog-description'>
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteConfirmation(false);
              setCategory({});
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
}

export default Category;

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
import AddEditCategory from "@/components/dashboard/category/AddEditCategory";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import apiService from "@/utils/api";
import toast from "react-hot-toast";
import CenteredLoading from "@/components/centeredLoading/CenteredLoading";
import { useDispatch, useSelector } from "react-redux";
import { categoryDetails } from "@/config/redux/selectors/categorySelectors";
import { updateCategories } from "@/config/redux/categorySlice/categorySlice";

function Category() {
  const { allCategories } = useSelector(categoryDetails);
  const dispatch = useDispatch();
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  useEffect(() => {
    if (!allCategories.length) {
      fetchCategories();
    }
  }, []);
  const ButtonCellRenderer = useCallback((params) => {
    const handleDelete = () => {
      setOpenDeleteConfirmation(true);
      setCategory(params.data);
    };
    const handleEdit = () => {
      setOpen(true);
      setCategory(params.data);
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

  const handleAddCategory = () => {
    setOpen(true);
    setCategory({});
  };
  const handleCancel = useCallback(() => {
    setOpen(false);
    setCategory({});
  }, []);
  const handleCategoryAdded = (newCategory) => {
    dispatch(updateCategories([newCategory, ...allCategories]));
  };
  const handleCategoryEdited = (newCategory) => {
    const updatedCategory = allCategories.map((category) =>
      category._id === newCategory._id ? newCategory : category
    );
    dispatch(updateCategories(updatedCategory));
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
      headerName: "Category Name",
      valueGetter: (p) => p.data.name,
      flex: 1,
    },

    {
      field: "Created By",
      valueFormatter: (p) => p.data.createdBy,
      flex: 1,
    },
    {
      field: "Updated By",
      valueFormatter: (p) => p.data.updatedBy,
      flex: 1,
    },
    {
      field: "Category Description",
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
        <h1>Category</h1>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => fetchCategories()}
            sx={{ textTransform: "capitalize" }}
            startIcon={<RefreshIcon />}
          >
            Refresh
          </Button>
          {!open && !openDeleteConfirmation && (
            <Button
              variant='contained'
              color='primary'
              onClick={handleAddCategory}
              sx={{ textTransform: "capitalize" }}
            >
              {category._id ? "Edit Category" : "Add Category"}
            </Button>
          )}
        </Box>
      </div>
      {!loading && open && (
        <AddEditCategory
          isOpen={open}
          category={category}
          onClose={handleCancel}
          onCategoryAdded={handleCategoryAdded}
          onCategoryEdited={handleCategoryEdited}
        />
      )}
      {loading ? (
        <CenteredLoading />
      ) : (
        <MyTable columnDefs={columnDefs} data={allCategories} />
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

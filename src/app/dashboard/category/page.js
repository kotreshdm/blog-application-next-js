"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import MyTable from "@/components/dashboard/AgGridTable";
import { useCallback, useEffect, useState } from "react";
import AddEditCategory from "@/components/dashboard/category/AddEditCategory";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import apiService from "@/utils/api";
import toast from "react-hot-toast";
import CenteredLoading from "@/components/centeredLoading/CenteredLoading";

function Category() {
  const [open, setOpen] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.get("/categories", {});
        if (!response.status === 200) {
          throw new Error("Failed to fetch categories");
        }
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryAdded = (newCategory) => {
    setCategories((prevCategories) => [newCategory, ...prevCategories]);
  };
  const handleCategoryEdited = (newCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === newCategory._id ? newCategory : category
      )
    );
    setCategory({});
  };
  const handleConfirmDelete = () => {
    const deleteCategory = async () => {
      try {
        const response = await apiService.delete(
          `/categories?id=${category._id}`
        );
        if (response.data.success) {
          setCategories((prevCategories) =>
            prevCategories.filter((cat) => cat._id !== category._id)
          );
          setOpenDeleteConfirmation(false);
          toast.success(`${category.name} deleted successfully`);
        } else {
          throw new Error(response.message || "Failed to delete category");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error(error.message || "Failed to delete category");
      }
    };

    deleteCategory();
  };

  const handleAddCategory = () => {
    setOpen(true);
    setCategory({});
  };

  const handleCancel = useCallback(() => {
    setOpen(false);
    setCategory({});
  }, []);

  const ButtonCellRenderer = useCallback((params) => {
    const handleEdit = () => {
      setOpen(true);
      setCategory(params.data);
    };
    const handleDelete = () => {
      setOpenDeleteConfirmation(true);
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
        <h1>Category</h1> {open}
        {!open && (
          <Button
            variant='contained'
            color='primary'
            onClick={handleAddCategory}
            sx={{ textTransform: "capitalize" }}
          >
            {category._id ? "Edit Category" : "Add Category"}
          </Button>
        )}
      </div>
      {!loading && open && (
        <AddEditCategory
          category={category}
          handleCancel={handleCancel}
          onCategoryAdded={handleCategoryAdded}
          onCategoryEdited={handleCategoryEdited}
        />
      )}
      {loading ? (
        <CenteredLoading />
      ) : (
        <MyTable columnDefs={columnDefs} data={categories} />
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
            onClick={() => setOpenDeleteConfirmation(false)}
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

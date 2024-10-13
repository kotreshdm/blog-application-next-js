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
import { useCallback, useEffect, useMemo, useState } from "react";
import AddEditCategory from "@/components/dashboard/category/AddEditCategory";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import apiService from "@/utils/api";
import toast from "react-hot-toast";

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
  const handleConfirmDelete = () => {
    console.log("Confirm delete clicked");
    console.log("Deleting category:", category);
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
  };
  const handleEditCategory = () => {
    console.log("Edit clicked");
  };

  const ButtonCellRenderer = useCallback((params) => {
    const handleEdit = () => {
      console.log("Edit clicked for:", params.data);
    };

    const handleDelete = () => {
      console.log("Delete clicked for:", params.data);
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

  const columnDefs = useMemo(() => [
    {
      headerName: "Category Name",
      valueGetter: (p) => p.data.name,
      flex: 2,
    },

    {
      field: "Createdz By",
      valueFormatter: (p) => p.data.createdBy,
      flex: 1,
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ButtonCellRenderer,
      flex: 1,
    },
  ]);

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
            Add Category
          </Button>
        )}
      </div>
      {!loading && open && (
        <AddEditCategory
          setOpen={setOpen}
          onCategoryAdded={handleCategoryAdded}
        />
      )}
      {!loading && (
        <MyTable
          columnDefs={columnDefs}
          data={categories}
          editFn={handleEditCategory}
        />
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

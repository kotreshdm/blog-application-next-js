"use client";

import { Button, IconButton, Stack } from "@mui/material";
import MyTable from "@/components/dashboard/AgGridTable";
import { useCallback, useEffect, useMemo, useState } from "react";
import AddEditCategory from "@/components/dashboard/category/AddEditCategory";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import apiService from "@/utils/api";

function Category() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
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
  const handleAddCategory = () => {
    setOpen(true);
  };
  const handleEditCategory = () => {
    console.log("Edit clicked");
  };
  const updateOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const ButtonCellRenderer = useCallback((params) => {
    const handleEdit = () => {
      console.log("Edit clicked for:", params.data);
    };

    const handleDelete = () => {
      console.log("Delete clicked for:", params.data);
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
    </div>
  );
}

export default Category;

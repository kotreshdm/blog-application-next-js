"use client";

import { Button, IconButton, Stack } from "@mui/material";
import MyTable from "@/components/dashboard/AgGridTable";
import { useCallback, useState } from "react";
import AddEditCategory from "@/components/dashboard/category/AddEditCategory";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Category() {
  const [open, setOpen] = useState(false);
  const handleAddCategory = () => {
    setOpen(true);
  };
  const handleEditCategory = () => {
    console.log("Edit clicked");
  };
  const updateOpen = useCallback(() => {
    setOpen(false);
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

  const [data, setData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Make & Model",
      valueGetter: (p) => p.data.make + " " + p.data.model,
      flex: 2,
    },
    {
      field: "price",
      valueFormatter: (p) => "£" + Math.floor(p.value).toLocaleString(),
      flex: 1,
    },
    {
      field: "price",
      valueFormatter: (p) => "£" + Math.floor(p.value).toLocaleString(),
      flex: 1,
    },
    {
      field: "price",
      valueFormatter: (p) => "£" + Math.floor(p.value).toLocaleString(),
      flex: 1,
    },
    {
      field: "price",
      valueFormatter: (p) => "£" + Math.floor(p.value).toLocaleString(),
      flex: 1,
    },
    {
      field: "price",
      valueFormatter: (p) => "£" + Math.floor(p.value).toLocaleString(),
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
      {open ? (
        <AddEditCategory setOpen={updateOpen} />
      ) : (
        <MyTable
          columnDefs={columnDefs}
          data={data}
          editFn={handleEditCategory}
        />
      )}
    </div>
  );
}

export default Category;

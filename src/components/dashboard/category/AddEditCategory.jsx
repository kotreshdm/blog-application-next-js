"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import apiService from "@/utils/api";
import toast from "react-hot-toast";

const AddEditCategory = ({ setOpen, onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await apiService.post("/categories", {
        name: categoryName,
      });

      toast.success(`${response.data.category.name} created successfully!`);

      // Call the onCategoryAdded callback to update the parent component
      if (onCategoryAdded) {
        onCategoryAdded(response.data.category);
      }

      // Close the modal or dialog
      setOpen(false);
    } catch (error) {
      console.error("Error creating category:", error);
      setError("Failed to create category. Please try again.");
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant='h6' gutterBottom>
        Add New Category
      </Typography>
      <TextField
        fullWidth
        label='Category Name'
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        margin='normal'
        required
        error={!!error}
        helperText={error}
      />
      <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={isLoading}
          sx={{ textTransform: "capitalize" }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Create Category"}
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleCancel}
          disabled={isLoading}
          sx={{ textTransform: "capitalize" }}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default AddEditCategory;

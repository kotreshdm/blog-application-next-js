"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  CircularProgress,
  Grid,
} from "@mui/material";
import apiService from "@/utils/api";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const AddEditCategory = React.memo(
  ({ category, handleCancel, onCategoryAdded, onCategoryEdited }) => {
    const { data: session } = useSession();

    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
      setCategoryName(category?.name || "");
      setDescription(category?.description || "");
    }, [category]);
    const handleCategoryNameChange = useCallback((e) => {
      setCategoryName(e.target.value);
    }, []);

    const handleDescriptionChange = useCallback((e) => {
      setDescription(e.target.value);
    }, []);

    const handleSubmitAdd = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      try {
        const response = await apiService.post("/categories", {
          name: categoryName,
          description: description,
          createdBy: session.user._id,
        });

        toast.success(`${response.data.category.name} created successfully!`);

        if (onCategoryAdded) {
          onCategoryAdded(response.data.category);
        }
        handleCancel();
      } catch (error) {
        console.error("Error saving category:", error);
        setError(error.message || "Failed to save category. Please try again.");
        toast.error(error.message || "Failed to save category");
      } finally {
        setIsLoading(false);
      }
    };
    const handleSubmitEdit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      try {
        const response = await apiService.put(
          `/categories?id=${category._id}`,
          {
            name: categoryName,
            description: description,
            updatedBy: session.user._id,
          }
        );

        toast.success(`${response.data.category.name} updated successfully!`);

        if (onCategoryEdited) {
          onCategoryEdited(response.data.category);
        }
        handleCancel();
      } catch (error) {
        console.error("Error saving category:", error);
        setError(error.message || "Failed to save category. Please try again.");
        toast.error(error.message || "Failed to save category");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Box
        component='form'
        onSubmit={category._id ? handleSubmitEdit : handleSubmitAdd}
        sx={{ mt: 2 }}
      >
        <Typography variant='h6' gutterBottom>
          {category._id ? "Edit Category" : "Add New Category"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Category Name'
              value={categoryName}
              onChange={handleCategoryNameChange}
              margin='normal'
              required
              error={!!error}
              helperText={error}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Description'
              value={description}
              onChange={handleDescriptionChange}
              margin='normal'
            />
          </Grid>
        </Grid>
        <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
          <Button onClick={handleCancel} variant='outlined' color='secondary'>
            Cancel
          </Button>
        </Stack>
      </Box>
    );
  }
);

// Add this line to set the display name
AddEditCategory.displayName = "AddEditCategory";

export default AddEditCategory;

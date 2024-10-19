"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  TextField,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import apiService from "@/utils/api";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

import FormTextField from "@/components/form/formTextField/FormTextField";
import {
  setAddEditCategoryDialog,
  setSelectedCategory,
  updateCategories,
} from "@/config/redux/categorySlice/categorySlice";
import { categoryDetails } from "@/config/redux/selectors/categorySelectors";

const AddEditCategory = React.memo(() => {
  const dispatch = useDispatch();
  const { allCategories, selectedCategory, addEditCategoryDialog } =
    useSelector(categoryDetails);
  const [error, setError] = useState({});
  const { data: session } = useSession();
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [removeImage, setRemoveImage] = useState(false);
  useEffect(() => {
    if (selectedCategory.image) {
      setImagePreview(
        `data:image/jpeg;base64,${Buffer.from(selectedCategory.image).toString(
          "base64"
        )}`
      );
    } else {
      setImagePreview("");
    }
  }, []);

  const onClose = () => {
    dispatch(setSelectedCategory({}));
    dispatch(setAddEditCategoryDialog(false));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const img = new Image();
      img.onload = () => {
        if (img.width === 300 && img.height === 200) {
          dispatch(
            setSelectedCategory({
              ...selectedCategory,
              image: file,
            })
          );
          setImagePreview(URL.createObjectURL(file));
        } else {
          toast.error("Image dimensions must be 300x200 pixels.");
          e.target.value = null;
        }
      };
      img.onerror = () => {
        toast.error("Failed to load the image. Please try again.");
        e.target.value = null;
      };
      img.src = URL.createObjectURL(file);
      setRemoveImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errors = {};
    if (!selectedCategory.name) {
      errors.name = "Category name is required";
    }
    if (Object.keys(errors).length > 0) {
      setError(errors);
      setIsLoading(false);
      return;
    }
    setError({});
    try {
      const apiEndpoint = selectedCategory?._id
        ? `/categories?id=${selectedCategory._id}`
        : "/categories";
      const method = selectedCategory?._id ? "put" : "post";
      const formData = new FormData();
      formData.append("name", selectedCategory.name || "");
      formData.append("description", selectedCategory.description || "");
      formData.append("createdBy", session.user._id);
      formData.append("removeImage", removeImage);
      if (selectedCategory.image) {
        formData.append("image", selectedCategory.image);
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await apiService[method](apiEndpoint, formData, config);
      toast.success(response.data.message);
      selectedCategory._id
        ? dispatch(
            updateCategories(
              allCategories.map((category) =>
                category._id === response.data.category._id
                  ? response.data.category
                  : category
              )
            )
          )
        : dispatch(
            updateCategories([response.data.category, ...allCategories])
          );
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to save category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={addEditCategoryDialog}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle>
        {selectedCategory?._id ? "Edit Category" : "Add Category"}
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <FormTextField
            required
            label='Category Name'
            value={selectedCategory.name || ""}
            onChange={(e) =>
              dispatch(
                setSelectedCategory({
                  ...selectedCategory,
                  name: e.target.value,
                })
              )
            }
            error={error.name}
            helperText={error.name}
          />
          <FormTextField
            label='Category Description'
            value={selectedCategory.description || ""}
            onChange={(e) =>
              dispatch(
                setSelectedCategory({
                  ...selectedCategory,
                  description: e.target.value,
                })
              )
            }
            error={error.description}
            helperText={error.description}
          />
          <input
            accept='image/*'
            style={{ display: "none" }}
            id='raised-button-file'
            type='file'
            onChange={handleImageChange}
          />
          {imagePreview && (
            <Box mt={2}>
              <img
                src={imagePreview}
                alt='Preview'
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </Box>
          )}
          <Box sx={{ mt: 2, mb: 2, display: "flex", gap: 2 }}>
            <label htmlFor='raised-button-file'>
              <Button
                variant='contained'
                component='span'
                sx={{ textTransform: "capitalize" }}
              >
                {imagePreview ? "Change Image" : "Upload Image"}
              </Button>
            </label>
            {imagePreview && (
              <Button
                sx={{ textTransform: "capitalize" }}
                variant='outlined'
                color='secondary'
                onClick={() => {
                  dispatch(
                    setSelectedCategory({ ...selectedCategory, image: null })
                  );
                  setImagePreview(null);
                  setRemoveImage(true);
                }}
              >
                Remove Image
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button sx={{ textTransform: "capitalize" }} onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant='contained'
          color='primary'
          disabled={isLoading}
          sx={{ textTransform: "capitalize" }}
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

AddEditCategory.displayName = "AddEditCategory";

export default AddEditCategory;

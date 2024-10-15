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
import FormTextField from "@/components/form/formTextField/FormTextField";

const AddEditCategory = React.memo(
  ({ isOpen, onClose, onCategoryAdded, onCategoryEdited, category }) => {
    const { data: session } = useSession();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [imageBase64, setImageBase64] = useState("");

    useEffect(() => {
      if (category) {
        setName(category.name || "");
        setDescription(category.description || "");
        if (category.image) {
          setImageBase64(Buffer.from(category.image).toString("base64"));
          setImagePreview(
            `data:image/jpeg;base64,${Buffer.from(category.image).toString(
              "base64"
            )}`
          );
        } else {
          setImageBase64("");
          setImagePreview("");
        }
      } else {
        setName("");
        setDescription("");
        setImageBase64("");
        setImagePreview("");
      }
    }, [category]);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const img = new Image();
        img.onload = () => {
          if (img.width === 300 && img.height === 200) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
          } else {
            toast.error("Image dimensions must be 300x200 pixels.");
            e.target.value = null; // Reset the file input
          }
        };
        img.onerror = () => {
          toast.error("Failed to load the image. Please try again.");
          e.target.value = null; // Reset the file input
        };
        img.src = URL.createObjectURL(file);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      setIsLoading(true);
      try {
        const apiEndpoint = category?._id
          ? `/categories?id=${category._id}`
          : "/categories";
        const method = category?._id ? "put" : "post";

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("createdBy", session.user._id);
        if (image) {
          formData.append("image", image);
        }

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await apiService[method](
          apiEndpoint,
          formData,
          config
        );

        toast.success(
          `${response.data.category.name} ${
            category ? "updated" : "created"
          } successfully!`
        );
        category._id
          ? onCategoryEdited?.(response.data.category)
          : onCategoryAdded?.(response.data.category);
        onClose();
      } catch (error) {
        toast.error("Failed to save category");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Dialog open={isOpen} onClose={onClose} maxWidth='sm' fullWidth>
        <DialogTitle>
          {category ? "Edit Category" : "Add Category"}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormTextField
              label='Category Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                    setImagePreview(null);
                    setImage(null);
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
  }
);

AddEditCategory.displayName = "AddEditCategory";

export default AddEditCategory;

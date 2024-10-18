"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import apiService from "@/utils/api";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import FormTextField from "@/components/form/formTextField/FormTextField";
import { useDispatch, useSelector } from "react-redux";
import { categoryDetails } from "@/config/redux/selectors/categorySelectors";

const AddEditBlog = React.memo(
  ({ isOpen, onClose, onBlogAdd, selected, onBlogEdit }) => {
    const { allCategories } = useSelector(categoryDetails);
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [removeImage, setRemoveImage] = useState(false);
    const [slug, setSlug] = useState("");
    useEffect(() => {
      if (selected) {
        setName(selected.name || "");
        setDescription(selected.description || "");
        setCategory(selected.category || "");
        if (selected.image) {
          setImagePreview(
            `data:image/jpeg;base64,${Buffer.from(selected.image).toString(
              "base64"
            )}`
          );
        } else {
          setImagePreview("");
        }
      } else {
        setName("");
        setDescription("");
        setImagePreview("");
      }
    }, [selected]);

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

      try {
        const apiEndpoint = selected?._id
          ? `/blogs?id=${selected._id}`
          : "/blogs";
        const method = selected?._id ? "put" : "post";
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("createdBy", session.user._id);
        formData.append("removeImage", removeImage);
        formData.append("category", category);
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
        toast.success(response.data.message);
        selected._id
          ? onBlogEdit?.(response.data.blog)
          : onBlogAdd?.(response.data.blog);
        onClose();
      } catch (error) {
        toast.error(error.message || "Failed to save blog");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Dialog open={isOpen} onClose={onClose} maxWidth='sm' fullWidth>
        <DialogTitle>
          {selected._id ? "Edit Blog" : "Add Blog"}
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
              label='Blog Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormTextField
              label='Blog Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <InputLabel id='category-select-label'>Blog Category</InputLabel>
              <Select
                labelId='category-select-label'
                id='category-select'
                value={category}
                label='Blog Category'
                onChange={(e) => setCategory(e.target.value)}
              >
                {allCategories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
  }
);

AddEditBlog.displayName = "AddEditBlog";

export default AddEditBlog;

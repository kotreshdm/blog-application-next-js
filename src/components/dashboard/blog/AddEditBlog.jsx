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
import {
  setAddEditBlogDialog,
  setSelectedBlog,
  updateBlogs,
} from "@/config/redux/blogSlice/blogSlice";
import { blogDetails } from "@/config/redux/selectors/blogSelectors";

const AddEditBlog = React.memo(() => {
  const { allCategories } = useSelector(categoryDetails);
  const { allBlogs, selectedBlog, addEditBlogDialog } =
    useSelector(blogDetails);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [seoKeyword, setSeoKeyword] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [removeImage, setRemoveImage] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log(selectedBlog);

    if (selectedBlog) {
      setName(selectedBlog.name || "");
      setDescription(selectedBlog.description || "");
      setCategory(selectedBlog.category || "");
      setStatus(selectedBlog.status || "active");
      setSeoTitle(selectedBlog.seoTitle || "");
      setSeoDescription(selectedBlog.seoDescription || "");
      setSeoKeyword(selectedBlog.seoKeyword || "");
      setImagePreview(
        selectedBlog.image
          ? `data:image/jpeg;base64,${Buffer.from(selectedBlog.image).toString(
              "base64"
            )}`
          : ""
      );
    }
  }, [selectedBlog]);

  const onClose = () => {
    dispatch(setSelectedBlog({}));
    dispatch(setAddEditBlogDialog(false));
  };

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
    const errors = {};
    if (!name) {
      errors.name = "Blog name is required";
    }
    if (!description) {
      errors.description = "Blog description is required";
    }
    if (!category) {
      errors.category = "Blog category is required";
    }
    if (!seoTitle) {
      errors.seoTitle = "SEO title is required";
    }
    if (!seoDescription) {
      errors.seoDescription = "SEO description is required";
    }
    if (!seoKeyword) {
      errors.seoKeyword = "SEO keyword is required";
    }
    if (!status) {
      errors.status = "Blog status is required";
    }
    if (Object.keys(errors).length > 0) {
      setError(errors);
      setIsLoading(false);
      return;
    } else {
      setError({});
    }
    try {
      const apiEndpoint = selectedBlog?._id
        ? `/blogs?id=${selectedBlog._id}`
        : "/blogs";
      const method = selectedBlog?._id ? "put" : "post";
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("createdBy", session.user._id);
      formData.append("removeImage", removeImage);
      formData.append("category", category);
      formData.append("seoTitle", seoTitle);
      formData.append("seoDescription", seoDescription);
      formData.append("seoKeyword", seoKeyword);
      formData.append("status", status);
      if (image) {
        formData.append("image", image);
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await apiService[method](apiEndpoint, formData, config);
      toast.success(response.data.message);
      const newPost = response.data.blog;
      selectedBlog._id
        ? dispatch(
            updateBlogs(
              allBlogs.map((post) =>
                post._id === newPost._id ? newPost : post
              )
            )
          )
        : dispatch(updateBlogs([newPost, ...allBlogs]));
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to save blog");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={addEditBlogDialog} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        {selectedBlog._id ? "Edit Blog" : "Add Blog"}
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              mb: 2,
            }}
            item={2}
          >
            <FormTextField
              required
              fullWidth
              label='Blog Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={error.name}
              helperText={error.name}
            />
            <FormTextField
              fullWidth
              label='Blog Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={error.description}
              helperText={error.description}
            />
            <FormTextField
              fullWidth
              label='SEO Title'
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              error={error.seoTitle}
              helperText={error.seoTitle}
            />
            <FormTextField
              fullWidth
              label='SEO Keyword'
              value={seoKeyword}
              onChange={(e) => setSeoKeyword(e.target.value)}
              error={error.seoKeyword}
              helperText={error.seoKeyword}
            />
            <FormTextField
              label='SEO Description'
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              error={error.seoDescription}
              helperText={error.seoDescription}
            />
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <InputLabel id='category-select-label'>Blog Category</InputLabel>
              <Select
                labelId='category-select-label'
                id='category-select'
                value={category}
                label='Blog Category'
                onChange={(e) => setCategory(e.target.value)}
                error={error.category}
                helperText={error.category}
              >
                {allCategories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <InputLabel id='category-status-label'>Blog Status</InputLabel>
              <Select
                labelId='category-status-label'
                id='category-status'
                value={status}
                label='Blog Status'
                onChange={(e) => setStatus(e.target.value)}
                error={error.status}
                helperText={error.status}
              >
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>

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
});

AddEditBlog.displayName = "AddEditBlog";

export default AddEditBlog;

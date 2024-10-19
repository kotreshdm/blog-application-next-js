"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddEditBlog = React.memo(() => {
  const { allCategories } = useSelector(categoryDetails);
  const { allBlogs, selectedBlog, addEditBlogDialog } =
    useSelector(blogDetails);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [seoKeyword, setSeoKeyword] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [removeImage, setRemoveImage] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedBlog) {
      setName(selectedBlog.name || "");
      setShortDescription(selectedBlog.shortDescription || "");
      setDescription(selectedBlog.description || "");
      setCategory(selectedBlog.category || "");
      setStatus(selectedBlog.status || "active");
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
    if (!shortDescription) {
      errors.shortDescription = "Short description is required";
    }
    if (!description) {
      errors.description = "Blog description is required";
    }
    if (!category) {
      errors.category = "Blog category is required";
    }

    if (!seoDescription) {
      errors.seoDescription = "SEO description is required";
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
      formData.append("shortDescription", shortDescription);
      formData.append("description", description);
      formData.append("createdBy", session.user._id);
      formData.append("removeImage", removeImage);
      formData.append("category", category);
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
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Box component='form' noValidate sx={{ mt: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          <FormTextField
            required
            fullWidth
            label='Blog Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error.name}
            helperText={error.name}
            autoFocus={true}
          />
          <FormTextField
            fullWidth
            label='Short Description'
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            error={error.shortDescription}
            helperText={error.shortDescription}
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
            fullWidth
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
          <input
            accept='image/*'
            style={{ display: "none" }}
            id='raised-button-file'
            type='file'
            onChange={handleImageChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 4,
          }}
        >
          {imagePreview && (
            <Box mt={2}>
              <img
                src={imagePreview}
                alt='Preview'
                style={{ maxWidth: "100%", maxHeight: "100px" }}
              />
            </Box>
          )}
          <Box sx={{ m: 2, p: 2 }}>
            <label htmlFor='raised-button-file'>
              <Button
                variant='contained'
                component='span'
                sx={{ textTransform: "capitalize", m: 2 }}
              >
                {imagePreview ? "Change Image" : "Upload Image"}
              </Button>
            </label>
            {imagePreview && (
              <Button
                sx={{ textTransform: "capitalize" }}
                variant='outlined'
                color='secondary'
                component='span'
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
      </Box>
      <Box sx={{ overflow: "auto", height: "80vh" }}>
        <ReactQuill
          modules={modules}
          formats={formats}
          theme='snow'
          value={description}
          onChange={setDescription}
          style={{ height: "74vh" }}
        />
      </Box>
      <DialogActions
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "background.paper",
        }}
      >
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
    </Box>
  );
});

AddEditBlog.displayName = "AddEditBlog";

export default AddEditBlog;

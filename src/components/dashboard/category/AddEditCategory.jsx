"use client";

import { useState } from "react";
import { TextField, Button, Box, Typography, Stack } from "@mui/material";

const AddEditCategory = ({ setOpen }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement category creation logic here
    console.log("Creating category:", categoryName);
    // After creating, you might want to close the modal or navigate back
    setOpen(false);
  };

  const handleCancel = () => {
    // Close the modal or navigate back without saving
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
      />
      <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ textTransform: "capitalize" }}
        >
          Create Category
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleCancel}
          sx={{ textTransform: "capitalize" }}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default AddEditCategory;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { blogDetails } from "@/config/redux/selectors/blogSelectors";
import {
  setSelectedBlog,
  setViewBlogDialog,
} from "@/config/redux/blogSlice/blogSlice";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
  Button,
  Box,
  IconButton,
} from "@mui/material";

const ViewBlog = () => {
  const { selectedBlog, viewBlogDialog } = useSelector(blogDetails);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setViewBlogDialog(false));
    dispatch(setSelectedBlog({}));
  };
  return (
    <Dialog open={viewBlogDialog} onClose={handleClose} fullWidth maxWidth='lg'>
      <DialogTitle>
        Blog Details
        <IconButton
          aria-label='close'
          onClick={handleClose}
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
        <table
          style={{ width: "100%" }}
          border={1}
          cellPadding={5}
          cellSpacing={0}
        >
          <tbody>
            <tr>
              <td>
                <Typography variant='body1'>Name</Typography>
              </td>
              <td>
                <Typography variant='body1'>Slug</Typography>
              </td>
              <td>
                <Typography variant='body1'>Category</Typography>
              </td>
              <td>
                <Typography variant='body1'>SEO Description</Typography>
              </td>
              <td>
                <Typography variant='body1'>SEO Keyword</Typography>
              </td>

              <td>
                <Typography variant='body1'>Status</Typography>
              </td>
              <td>
                <Typography variant='body1'>Created At</Typography>
              </td>
              <td>
                <Typography variant='body1'>Updated At</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant='body1'>{selectedBlog.name}</Typography>
              </td>

              <td>
                <Typography variant='body1'>{selectedBlog.slug}</Typography>
              </td>
              <td>
                <Typography variant='body1'>{selectedBlog.category}</Typography>
              </td>
              <td>
                <Typography variant='body1'>
                  {selectedBlog.seoDescription}
                </Typography>
              </td>
              <td>
                <Typography variant='body1'>
                  {selectedBlog.seoKeyword}
                </Typography>
              </td>
              <td>
                <Typography variant='body1'>{selectedBlog.status}</Typography>
              </td>
              <td>
                <Typography variant='body1'>
                  {new Date(selectedBlog.createdAt).toLocaleString()}
                </Typography>
              </td>
              <td>
                <Typography variant='body1'>
                  {new Date(selectedBlog.updatedAt).toLocaleString()}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
        {selectedBlog.image && (
          <img
            src={`data:image/jpeg;base64,${Buffer.from(
              selectedBlog.image
            ).toString("base64")}`}
            alt='Blog'
            style={{
              width: "auto",
              height: "100px",
              objectFit: "cover",
            }}
          />
        )}
        {selectedBlog.shortDescription}
        <Box sx={{ mt: 1 }}>
          <Typography variant='h6'>Description:</Typography>
          <Box
            dangerouslySetInnerHTML={{ __html: selectedBlog.description }}
            sx={{
              "& img": { maxWidth: "100%", height: "auto" },
              "& a": { color: "primary.main", textDecoration: "none" },
              "& ul, & ol": { paddingLeft: 2 },
              "& blockquote": {
                borderLeft: "3px solid #ccc",
                margin: "1.5em 10px",
                padding: "0.5em 10px",
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='contained' color='secondary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewBlog;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { blogDetails } from "@/config/redux/selectors/blogSelectors";
import {
  setSelectedBlog,
  setViewBlogDialog,
} from "@/config/redux/blogSlice/blogSlice";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";

const ViewBlog = () => {
  const { selectedBlog, viewBlogDialog } = useSelector(blogDetails);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setViewBlogDialog(false));
    dispatch(setSelectedBlog({}));
  };
  return (
    <Dialog open={viewBlogDialog} onClose={handleClose} fullWidth>
      <DialogTitle>Blog Details</DialogTitle>
      <DialogContent>
        <table>
          <tbody>
            <tr>
              <td>
                <Typography variant='body1'>Name:</Typography>
              </td>
              <td>
                <Typography variant='body1'>{selectedBlog.name}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant='body1'>Slug:</Typography>
              </td>
              <td>
                <Typography variant='body1'>{selectedBlog.slug}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant='body1'>Description:</Typography>
              </td>
              <td>
                <Typography variant='body1'>
                  {selectedBlog.description}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant='body1'>Category:</Typography>
              </td>
              <td>
                <Typography variant='body1'>{selectedBlog.category}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant='body1'>Image:</Typography>
              </td>
              <td>
                {selectedBlog.image ? (
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
                ) : (
                  <Typography variant='body1'>No Image</Typography>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant='body1'>SEO Title:</Typography>
              </td>
              <td>
                <Typography variant='body1'>{selectedBlog.seoTitle}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant='body1'>SEO Description:</Typography>
              </td>
              <td>
                <Typography variant='body1'>
                  {selectedBlog.seoDescription}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant='body1'>SEO Keyword:</Typography>
              </td>
              <td>
                <Typography variant='body1'>
                  {selectedBlog.seoKeyword}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant='body1'>Created By:</Typography>
              </td>
              <td>
                <Typography variant='body1'>
                  {selectedBlog.createdBy}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant='body1'>Updated By:</Typography>
              </td>
              <td>
                <Typography variant='body1'>
                  {selectedBlog.updatedBy}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant='body1'>Status:</Typography>
              </td>
              <td>
                <Typography variant='body1'>{selectedBlog.status}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant='body1'>Created At:</Typography>
              </td>
              <td>
                <Typography variant='body1'>
                  {new Date(selectedBlog.createdAt).toLocaleString()}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant='body1'>Updated At:</Typography>
              </td>
              <td>
                <Typography variant='body1'>
                  {new Date(selectedBlog.updatedAt).toLocaleString()}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewBlog;

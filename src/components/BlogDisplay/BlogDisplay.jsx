import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

const BlogDisplay = ({ blog }) => {
  const imageUrl = blog.image
    ? `data:image/jpeg;base64,${Buffer.from(blog.image).toString("base64")}`
    : "https://placehold.co/600x400";

  return (
    <div key={blog._id} style={{ marginBottom: "20px", textAlign: "left" }}>
      <Card sx={{ display: "flex", mb: 2 }}>
        <CardMedia
          component='img'
          sx={{ width: "auto", height: 251, objectFit: "cover" }}
          src={imageUrl}
          alt={blog.name}
        />

        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component='div' variant='h5'>
              {blog.name}
            </Typography>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              component='div'
            >
              {blog.author}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {blog.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small' color='primary'>
              Read More
            </Button>
          </CardActions>
        </Box>
      </Card>
    </div>
  );
};

export default BlogDisplay;

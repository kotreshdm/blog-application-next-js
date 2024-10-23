"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Box } from "@mui/material";
import apiService from "@/utils/api";
import CenteredLoading from "@/components/centeredLoading/CenteredLoading";

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        if (!slug) {
          console.error("Blog slug is missing");
          setLoading(false);
          return;
        }
        const res = await apiService.get(`/public/blogs?slug=${slug}`);
        setBlog(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return <CenteredLoading />;
  }

  if (!blog) {
    return <Typography>Blog post not found.</Typography>;
  }

  return (
    <Container>
      <Box my={4}>
        <Typography variant='h2' component='h2' gutterBottom>
          {blog.name}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary' gutterBottom>
          {/* {new Date(blog.createdAt).toLocaleDateString()} */}
        </Typography>
        <Box my={4}>
          <div dangerouslySetInnerHTML={{ __html: blog.description }} />
        </Box>
      </Box>
    </Container>
  );
};

export default BlogPost;

"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Box } from "@mui/material";
import apiService from "@/utils/api";
import CenteredLoading from "@/components/centeredLoading/CenteredLoading";
import { formatDistanceToNow } from "date-fns";

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        if (!slug) {
          setLoading(false);
          return;
        }
        const res = await apiService.get(`/public/blogs?slug=${slug}`);
        setBlog(res.data);
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
      <Box mt={2}>
        <Typography variant='h4' component='h4' gutterBottom>
          {blog.name}
        </Typography>
        <Box display='flex' alignItems='center' color='textSecondary' mb={1}>
          <Typography variant='subtitle2' color='textSecondary'>
            {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
          </Typography>
          <Typography variant='subtitle2' color='textSecondary' mx={1}>
            &bull;
          </Typography>
          <Typography variant='subtitle2' color='textSecondary'>
            Created by {blog.authorName}
          </Typography>
        </Box>
        {/* Blog description */}
        <Box mt={2} mb={4}>
          <div dangerouslySetInnerHTML={{ __html: blog.description }} />
        </Box>
      </Box>
    </Container>
  );
};

export default BlogPost;

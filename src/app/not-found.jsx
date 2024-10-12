"use client";
import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: "error.main", mb: 4 }} />
        <Typography variant='h1' component='h1' gutterBottom>
          404
        </Typography>
        <Typography variant='h4' component='h2' gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant='body1' sx={{ mb: 4 }}>
          Oops! The page you are looking for doesn't exist or has been moved.
        </Typography>
        <Link
          href={`/api/auth/signin?callbackUrl=${encodeURIComponent(
            window.location.href
          )}`}
          passHref
        >
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={() => router.push("/")}
          >
            Go to Home Page
          </Button>
        </Link>
      </Box>
    </Container>
  );
}

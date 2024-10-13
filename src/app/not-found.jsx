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
        <ErrorOutlineIcon
          sx={{ fontSize: 100, color: "warning.main", mb: 2 }}
        />
        <Typography variant='h1' component='h1' gutterBottom>
          404
        </Typography>
        <Typography variant='h4' component='h2' gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant='body1' sx={{ mb: 2 }}>
          We couldn&apos;t find the page you&apos;re looking for.
        </Typography>
        <Link href='/' passHref>
          <Button variant='contained' color='primary'>
            Go to Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}

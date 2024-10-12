import * as React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth='sm' sx={{ textAlign: "center", marginTop: "2rem" }}>
      <Typography variant='h3' gutterBottom>
        Welcome to Blog
      </Typography>
      <Typography variant='body1'>This is AI generated content</Typography>
      <Button variant='contained' color='primary'>
        Get Started
      </Button>
    </Container>
  );
}

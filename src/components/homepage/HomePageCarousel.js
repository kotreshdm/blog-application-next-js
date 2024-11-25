"use client";

import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography, Button, Grid, Box } from "@mui/material";
import Image from "next/image";
import img1 from "@/public/images/img1.svg";
import img2 from "@/public/images/img2.svg";
import img3 from "@/public/images/img3.svg";
import img4 from "@/public/images/img4.svg";

export default function HomePageCarousel() {
  const items = [
    {
      image: img1,
      title: "test",
      description:
        "A Team of Leading Fashion Technical Designers to Connect, Collaborate, and Create — Together.",
      buttonText: "Book a Consultation",
    },
    {
      image: img2,
      title: "Collaborate Seamlessly",
      description:
        "Use our intuitive tools to work with your team in real-time, no matter where you are.",
      buttonText: "Learn More",
    },
    {
      image: img3,
      title: "From Concept to Creation",
      description:
        "Turn your fashion sketches into detailed technical designs with expert guidance.",
      buttonText: "Get Started",
    },
    {
      image: img4,
      title: "Imagine & Innovate",
      description:
        "Bringing ideas to life with advanced design and innovation techniques.",
      buttonText: "Explore Now",
    },
  ];

  return (
    <Carousel sx={{ height: { xs: "auto", md: "600px" } }}>
      {items.map((item, index) => (
        <Paper
          key={index}
          elevation={9}
          sx={{ position: "relative", height: { xs: "auto", md: "500px" } }}
        >
          <Grid container sx={{ height: "100%" }}>
            {/* Left Side: Content */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: { xs: "absolute", md: "relative" },
                top: { xs: 0, md: "auto" },
                width: { xs: "100%", md: "auto" },
                height: { xs: "100%", md: "auto" },
                color: { xs: "#fff", md: "#000" },
                backgroundColor: {
                  xs: "rgba(0, 0, 0, 0.5)",
                  md: "transparent",
                },
                zIndex: 1,
              }}
            >
              <Typography variant='h4' component='h2' gutterBottom>
                {item.title}
              </Typography>
              <Typography variant='body1' paragraph>
                {item.description}
              </Typography>
              <Button variant='contained' color='primary'>
                {item.buttonText}
              </Button>
            </Grid>

            {/* Right Side: Image */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                position: "relative",
                height: "500px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f4f4f4",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "500px",
                  maxHeight: { md: "500px" },
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  layout='fill'
                  objectFit='cover'
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Carousel>
  );
}

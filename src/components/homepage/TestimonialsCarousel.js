import React from "react";
import Slider from "react-slick";
import { Box, Typography, Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const reviews = [
  {
    name: "Mariela C.",
    text: "I am super grateful to be part of this community...10k+ contracts!",
    image: "/path/to/image1.jpg", // Replace with actual paths or imports
  },
  {
    name: "John D.",
    text: "Josh's Courses ROCK! No buyers remorse here...sprinting in no time!",
    image: "/path/to/image2.jpg",
  },
  {
    name: "Alexis M.",
    text: "What a goldmine I landed on...couldn’t be more grateful!",
    image: "/path/to/image3.jpg",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

export default function TestimonialsCarousel() {
  return (
    <Box sx={{ maxWidth: "80%", margin: "auto", py: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Customers Testimonials
      </Typography>
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
              backgroundColor: "#f8f8f8",
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Avatar
              src={review.image}
              alt={review.name}
              sx={{ width: 80, height: 80, mb: 2 }}
            />
            <Typography variant="body1" sx={{ fontStyle: "italic", mb: 1 }}>
              {review.text}
            </Typography>
            <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} color="primary" />
              ))}
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {review.name}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

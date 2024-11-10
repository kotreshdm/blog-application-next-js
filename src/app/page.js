"use client";

import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography, Button, Grid, Box } from "@mui/material";
import Image from "next/image";
import img1 from "@/public/images/img1.svg";
import img2 from "@/public/images/img2.svg";
import img3 from "@/public/images/img3.svg";
import img4 from "@/public/images/img4.svg";
import HomePageCarousel from "@/components/homepage/HomePageCarousel";
import HomePageSection from "@/components/homepage/HomePageSection";
import TestimonialsCarousel from "@/components/homepage/TestimonialsCarousel";

export default function HomePage() {
  return (
    <div>
      <HomePageCarousel />
      <HomePageSection />
      {/* <TestimonialsCarousel /> */}
    </div>
  );
}

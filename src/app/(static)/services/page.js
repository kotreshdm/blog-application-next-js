"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material";
import FlaskRoundIcon from "@mui/icons-material/Science";
import PencilIcon from "@mui/icons-material/Edit";
import FileEditIcon from "@mui/icons-material/Description";
import TargetIcon from "@mui/icons-material/GpsFixed";
import ScissorsIcon from "@mui/icons-material/ContentCut";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowRightIcon from "@mui/icons-material/ArrowForward";

const services = [
  {
    title: "Concept Development",
    icon: <FlaskRoundIcon />,
    description:
      "Transform your raw ideas into viable fashion concepts. Our professional team guides you through silhouette development and design refinement, ensuring your vision becomes a market-ready product.",
  },
  {
    title: "Apparel Design",
    icon: <PencilIcon />,
    description:
      "Unique collection designs with distinct brand identity. Our technical designers create detailed fashion flats and sketches based on your vision, including front, back, and side views with color specifications.",
  },
  {
    title: "Tech Pack Design Service ",
    icon: <FileEditIcon />,
    description:
      "Comprehensive technical drawings with detailed garment specifications. Our tech packs include fabric, trims, color, and measurement specifications - everything manufacturers need for precise production.",
  },
  {
    title: "Sample Development",
    icon: <TargetIcon />,
    description:
      "Perfect your designs with our precise sample development process. We ensure 100% accuracy in reproducing your garment style, making your manufacturing journey smoother and more efficient.",
  },
  {
    title: "Clothing Manufacturing",
    icon: <ScissorsIcon />,
    description:
      "End-to-end clothing manufacturing and shipping services with our in-house production unit. We specialize in serving global brands with efficient backend manufacturing and logistics.",
  },
  {
    title: "Apparel Branding",
    icon: <TrendingUpIcon />,
    description:
      "Strategic brand development focused on consumer acceptance and market impact. We help build meaningful concepts that resonate with your target audience and drive market success.",
  },
];

export default function ServicesPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{ fontSize: "28px", mb: 4, fontWeight: 600 }}
          >
            Fashion Design and Development Services
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: "800px", mx: "auto" }}
          >
            Bringing your fashion brand to market with expert technical design,
            pattern making, and complete sampling solutions. Reduce operating
            costs by 30% while expanding your product offering.
          </Typography>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  border: "2px solid",
                  borderColor: "divider",
                  transition: "border-color 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2, color: "primary.main" }}>
                    {React.cloneElement(service.icon, { sx: { fontSize: 40 } })}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {service.description}
                  </Typography>
                  <Button
                    variant="text"
                    endIcon={<ArrowRightIcon />}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        transition: "transform 0.2s ease",
                      },
                      "&:hover .MuiSvgIcon-root": {
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowRightIcon />}
            sx={{ fontSize: "1.125rem" }}
          >
            Contact Us Now
          </Button>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Ready to bring your fashion ideas to life? Let&apos;s talk about your
            project.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

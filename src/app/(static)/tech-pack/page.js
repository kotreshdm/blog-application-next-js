"use client";

import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
} from "@mui/material";
import {
  CheckCircleOutline,
  Timeline,
  Description,
  Style,
  ArrowForward,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1a237e",
    },
    secondary: {
      main: "#0d47a1",
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      marginBottom: "1rem",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      marginBottom: "1rem",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
      marginBottom: "0.75rem",
    },
  },
});

export default function TechPackPage() {
  const [activeSection, setActiveSection] = useState("design");

  const features = [
    "Rendered Illustration - Flat Sketch (Front View - Back View)",
    "Color Combo - Various Color Options of the Garments",
    "Stitching & Construction Detailing",
    "Graphic / Print Detailing Including Pantone Color",
    "Embroidery / Appliqué / Other Embellishment Detailing",
    "Washing Detailing & Care Instructions",
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{ fontSize: "28px", mb: 4 }}
          >
            Apparel Design Studio | Tech Pack Designer | Manufacturer & Exporter
            of ReadyMade Garments
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "80vw", mx: "auto", textAlign: "left", mb: 2 }}
          >
            It is imperative that one sets things in place before putting out
            investments on a large scale production plan. Apparel Tech Packs set
            standards, processes and guidelines that clothing manufacturers can
            chart and track in order to physically sample the production pieces
            as designed by the clothing designer. Tech Packs augment the
            essential technicalities to fashion design sketches making it
            production ready.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "80vw", mx: "auto", textAlign: "left" }}
          >
            Fashion Studio Urban Purple provides you with right product
            detailing and specifications in the form of apparel tech packs that
            you can use to produce your garments. Our technical designers
            progressively examine the styles and conduct exhaustive analysis
            prior to designing the tech pack. We then deliver precise and
            production friendly apparel tech packs, making life easier for you
            and the eventual manufacturing house. We understand that your vision
            needs certain technicalities; we equip you with the required
            technical design assistance enabling your vision become a reality.
          </Typography>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg">
          {/* Services Grid */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/placeholder.svg?height=200&width=400"
                  alt="Apparel Design"
                />
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Apparel Design
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    As an apparel brand or a creative designer, your thoughts
                    and vision need to be translated lucidly and accurately to
                    help create the best fit solution for your requirement. We
                    at Fashion Studio Urban Purple encourage a two way
                    communication between the client and our designers, be it
                    through sketches or references from the web, ensuring ideal
                    technical designs and specification sheets.
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Our tech pack designers at Fashion Studio Urban Purple have
                    the experience of managing a multitude of clients and are
                    fully equipped to understand, analyze and convert your
                    creative vision to factory ready tech packs. Most
                    importantly, we re-iterate the importance of transferring
                    the initial design/ idea coherently to our design team,
                    allowing us to take it from there and process it faster.
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    In short, we take your idea in its raw form and convert it
                    to factory ready tech packs.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "white",
                      color: "primary.main",
                      "&:hover": {
                        bgcolor: "grey.100",
                      },
                    }}
                  >
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/placeholder.svg?height=200&width=400"
                  alt="Tech Packs"
                />
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Tech Packs
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Comprehensive technical packages including measurements,
                    materials, and construction details.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/placeholder.svg?height=200&width=400"
                  alt="Design Process"
                />
                <CardContent>
                  <Typography variant="h3" gutterBottom>
                    Design Process
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Streamlined design process from concept to production-ready
                    specifications.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Features Section */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h2" gutterBottom>
              What Constitutes a Tech Pack
            </Typography>
            <Grid container spacing={2}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper sx={{ p: 3 }}>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Process Section */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h2" gutterBottom>
              Our Process
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Timeline
                      sx={{ fontSize: 40, color: "primary.main", mb: 2 }}
                    />
                    <Typography variant="h3" gutterBottom>
                      Initial Consultation
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      We discuss your requirements and vision for the product.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Style
                      sx={{ fontSize: 40, color: "primary.main", mb: 2 }}
                    />
                    <Typography variant="h3" gutterBottom>
                      Design Development
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Creating detailed technical drawings and specifications.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Description
                      sx={{ fontSize: 40, color: "primary.main", mb: 2 }}
                    />
                    <Typography variant="h3" gutterBottom>
                      Final Documentation
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Delivering complete tech packs ready for production.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* CTA Section */}
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              bgcolor: "primary.main",
              color: "white",
              borderRadius: 2,
              mb: 8,
            }}
          >
            <Typography variant="h2" gutterBottom>
              Ready to Get Started?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Contact us today to discuss your apparel design needs
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "white",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "grey.100",
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

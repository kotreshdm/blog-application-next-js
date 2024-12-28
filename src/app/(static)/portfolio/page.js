// import React from "react";
// import { Container } from "@mui/material";

// const PortfolioPage = () => {
//   return (
//     <Container maxWidth='sm' sx={{ textAlign: "center", marginTop: "2rem" }}>
//       PortfolioPage
//     </Container>
//   );
// };

// export default PortfolioPage;
"use client";

import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { Check as CheckIcon } from "@mui/icons-material";

export default function PortfolioPage() {
  const offerings = [
    "Apparel Tech Pack",
    "Sample and Fit Corrections",
    "Designed Collection Line Sheet",
    "Production Costing",
    "Quality Assurance",
    "Guaranteed Delivery",
    "Apparel Production",
    "Logistic Support",
  ];

  const requirements = [
    "What are the styles you want to go ahead with?",
    "Do you have the sketches or similar designs ready?",
    "Your target Standard measurement or Any Brands Measurement you want to follow:",
    "What are your fabric preferences?",
    "Your preferred COO?",
    "What quantities do you want to produce?",
    "Do you also need labels and hang tags with your brand name on them?",
    "What is your delivery date?",
    "Any Target date for Sample delivery?",
  ];

  const processSteps = [
    { title: "Payment For Sample", color: "#FFA500" },
    { title: "Tech Pack, Pattern Mock Sample Development", color: "#FF6347" },
    { title: "We Ship Mock Swatches To You", color: "#4169E1" },
    { title: "Sampling Till Production Process Flow", color: "#32CD32" },
    {
      title:
        "We Ship Corrected Sample for your Final Selection / Comments by You",
      color: "#1E90FF",
    },
    {
      title:
        "You are Now Ready To Roll Purchase Order with 50% Advance Payment",
      color: "#FF4500",
    },
    { title: "We Ship Goods Upon Final 40% Balance Payment", color: "#008080" },
  ];

  const capabilities = [
    "Men's and Ladies T-Shirts",
    "Men's and Ladies Shirts - Casual & Formal",
    "Men's Ladies - Bottom, Denims, Trousers (Casual & Formal)",
    "Kids Clothing - Boys Shirts, Trousers, Denims, Shorts",
    "Kids - Girls Shirts, Frocks, Pants, Skirts, Shorts & Dresses",
    "Strong in sourcing Fabrics & Trims Sourcing",
  ];

  const machines = [
    "30 - Single needle Machines (JUKI Made)",
    "05 - Over Lock Machines ( JUKI & Siruba Made)",
    "05 - Flat Lock Machine for T-Shirt Production (Juki Made)",
    "02 - Button and Finishing Table for Garment Finishing",
    "02 - Layer Cutting Machine",
  ];

  const minimumOrder = [
    "T-Shirts( Plain ) - 200 PCS/Color/Style",
    "T-Shirts( Stripe ) - 500 PCS/Color/Style",
    "Woven Shirt/Pant(Plain) -300 PCS/Color/Style",
    "Woven Shirt Plus/Stripe and Checks - 1000 PCS/Color/Style",
    "Denim Jeans - 1000 PCS/Color/Style",
    "Ladies Dresses, Tops, Tunics 500 PCS/Color/Style",
    "Kids Apparel (Plain/Printed) 500 PCS/Color/Style",
  ];

  const packages = [
    {
      title: "Starter",
      price: "1,250",
      features: [
        "2 Styles ( T-Shirts)",
        "100 PCS Production",
        "Design & Tech Packs Included",
        "4 Sizes S, M, L, XL",
        "2 Sample Shipping",
        "1 Round of Fitting Adjustments",
        "Fedex D2D Shipping Included",
      ],
      buttonText: "Get Started",
      buttonColor: "error",
    },
    {
      title: "Second Package",
      price: "3,500",
      features: [
        "5 Styles Collection",
        "250 PCS Production",
        "Design & Tech Packs Included",
        "4 Sizes S, M, L, XL",
        "Line-Sheet Presentation",
        "5 Samples",
        "1 Round of Fitting Adjustments",
        "Fedex D2D Shipping Included",
      ],
      buttonText: "Get Going",
      buttonColor: "warning",
    },
    {
      title: "Full-Launch",
      price: "6,250",
      features: [
        "10 Styles Collection",
        "500 PCS Production",
        "Design & Tech Packs Included",
        "5 Sizes S, M, L, XL, XXL",
        "Line-Sheet Presentation",
        "10 Custom Samples",
        "1 Round of Fitting Adjustments",
        "Fedex D2D Shipping Included",
      ],
      buttonText: "Get It All",
      buttonColor: "success",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Clothing Designer | Tech Pack Designer | Clothing Manufacturer Exporter
        Readymade Garments
      </Typography>

      <Typography variant="h5" align="center" gutterBottom sx={{ mb: 4 }}>
        Clothing Manufacturing Process and Packages
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Our Offering for Clothing Manufacturing
              </Typography>
              <List>
                {offerings.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                What it takes to produce your brand merchandise?
              </Typography>
              <List>
                {requirements.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" align="center" sx={{ my: 4 }}>
        How We Extend Our Support
      </Typography>

      <Paper elevation={3} sx={{ p: 2, my: 4 }}>
        <Grid container spacing={2} alignItems="center">
          {processSteps.map((step, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    bgcolor: step.color,
                    color: "white",
                    p: 2,
                    borderRadius: 2,
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2">{step.title}</Typography>
                </Box>
              </Grid>
              {index < processSteps.length - 1 && (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={1}
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h4">→</Typography>
                  </Box>
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Paper>

      <Typography variant="h5" align="center" sx={{ my: 4 }}>
        Capabilities as Clothing Manufacturer
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Capabilities as Garment Manufacturer
              </Typography>
              <List>
                {capabilities.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Heavy Duty Machines
              </Typography>
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Heavy Duty Machines"
                width={300}
                height={200}
              />
              <List>
                {machines.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Minimum Order Quantity
              </Typography>
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Minimum Order Quantity"
                width={300}
                height={200}
              />
              <List>
                {minimumOrder.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" align="center" sx={{ my: 4 }}>
        Clothing Manufacturing Packages
      </Typography>

      <Grid container spacing={4}>
        {packages.map((pkg, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {pkg.title}
                </Typography>
                <Typography variant="h4" component="div" gutterBottom>
                  ${pkg.price}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <List dense>
                  {pkg.features.map((feature, idx) => (
                    <ListItem key={idx}>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained" color={pkg.buttonColor}>
                  {pkg.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

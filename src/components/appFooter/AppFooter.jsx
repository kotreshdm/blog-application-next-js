import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PaymentIcon from "@mui/icons-material/Payment"; // Placeholder for payment icons

function AppFooter() {
  return (
    <Box
      sx={{
        backgroundColor: "#f4f4f4",
        paddingY: 4,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container>
        <Grid container spacing={4} justifyContent="space-between">
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Scripto Graphics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fashion Studio and Garments Manufacturing & Export Unit Provide
              End-to-End Solutions to Small and Medium Apparel Brands and
              Clothing lines.
            </Typography>
            <Box mt={2}>
              <IconButton color="inherit" href="https://facebook.com">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" href="https://pinterest.com">
                <PinterestIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              CONTACT INFO
            </Typography>
            <Typography variant="body2">
              #302, 3rd Floor, No 33/10/B, 21, Suraj Nivas
              <br />
              Kodichikanahalli Main Rd, Someswara Layout,
              <br />
              Bilekahalli, Bengaluru, Karnataka 560076
            </Typography>
            <Typography variant="body2" mt={1}>
              📞 +91 9035001810
            </Typography>
            <Typography variant="body2" mt={1}>
              ✉️ scriptographics@gmail.com
            </Typography>
          </Grid>

          {/* Links */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  GENERAL LINKS
                </Typography>
                {["Home", "About us", "Best Seller", "Blog", "Contact"].map(
                  (link) => (
                    <Typography key={link} variant="body2">
                      <Link href="#" color="inherit" underline="hover">
                        {link}
                      </Link>
                    </Typography>
                  )
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  LEGAL
                </Typography>
                {[
                  "Privacy Policy",
                  "Terms & Condition",
                  "Disclaimer",
                  "Legal Notice",
                  "Payment Mode",
                  "Sitemap",
                ].map((link) => (
                  <Typography key={link} variant="body2">
                    <Link href="#" color="inherit" underline="hover">
                      {link}
                    </Link>
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box
          mt={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 Scripto Graphics Pvt Ltd. All Rights Reserved
          </Typography>
          <Box>
            {/* Replace with actual payment icons */}
            <IconButton color="inherit">
              <PaymentIcon />
            </IconButton>
            <IconButton color="inherit">
              <PaymentIcon />
            </IconButton>
            <IconButton color="inherit">
              <PaymentIcon />
            </IconButton>
            <IconButton color="inherit">
              <PaymentIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AppFooter;

"use client";

import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
}));

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{ fontSize: "28px", mb: 4, textAlign: "center", fontWeight: 600 }}
      >
        About Us
      </Typography>

      {/* Mission Section */}
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom color="primary">
          Who We Are
        </Typography>
        <Typography variant="body1" paragraph>
          As a fashion studio and clothing manufacturing unit, our mission is to
          provide outstanding clothing designs that are fashionable and nurture
          an inventory of unique fashion products. We, at Fashion Studio Urban
          Purple (FSUP) firmly believe in providing the guiding light for
          apparel brands and private clothing labels to create products with
          fundamentally better techniques.
        </Typography>
        <Typography variant="body1" paragraph>
          We are a one-stop destination for designers, offering services from
          Concept to Consumer. Our designs are unique and inspirational;
          delivering a collection line that can propel any brand en route to
          success.
        </Typography>
      </StyledPaper>

      {/* Services Section */}
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom color="primary">
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Our Mission is to empower small and start-up clothing brands to
          achieve success. Urban Purple, with its Parent Company,
          ScriptoGraphics, and other dedicated affiliate companies form a strong
          conglomerate of companies committed to the construction and growth of
          small and start-up apparel businesses without any geographical
          boundaries.
        </Typography>
      </StyledPaper>

      {/* Board Section */}
      <Typography
        variant="h4"
        gutterBottom
        color="primary"
        sx={{ mt: 6, mb: 4 }}
      >
        Board Members
      </Typography>
      <Grid container spacing={4}>
        {/* Board Member 1 */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <StyledAvatar src="/placeholder.svg" />
                <Typography variant="h5" gutterBottom>
                  Paromita Das
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Fashion Designer, Technical Designer, Managing Director
                </Typography>
                <Divider sx={{ my: 2, width: "100%" }} />
                <Typography variant="body2">
                  Paromita began her career as a fashion designer in various
                  industries and co-operative societies have experience working
                  in both high industry officials and people from grass root
                  levels. With More than 14 years of experience in various
                  apparel industry environments as a Creative and Technical
                  Designer she heads the Design Department of Urban Purple.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Board Member 2 */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <StyledAvatar src="/placeholder.svg" />
                <Typography variant="h5" gutterBottom>
                  Sashikant Khuntia
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Head Marketing and Public Relation
                </Typography>
                <Divider sx={{ my: 2, width: "100%" }} />
                <Typography variant="body2">
                  Sashikant is focused on Marketing and Public Relation specific
                  to Apparel Industry with More than years of Experience in
                  Industry association. As a Founder member of Urban Purple and
                  ScriptoGraphics, Active in both the IT and apparel industry
                  practices with 16 years of experience in marketing Sales,
                  information technology and Public relation sectors.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Partner Company Section */}
      <StyledPaper elevation={3} sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Our Partner Company
        </Typography>
        <Typography variant="h5" gutterBottom>
          SCRIPTOGRAPHICS
        </Typography>
        <Typography variant="body1">
          Scripto Graphics a newly formed technology company with a strong base
          of product lines related to apparel design and production. Founded and
          operated by Sashikant Khuntia Business operation analyst in Garment
          Technology and Kotresh D.M with strong base on system annalist and
          programming experience ScriptoGraphics is coming up with a lot of
          automation related to Apparel Design, tech pack and Garment
          Manufacturing software.
        </Typography>
      </StyledPaper>
    </Container>
  );
}

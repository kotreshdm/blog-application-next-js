import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import scriptographicsLogo from "@/public/images/scriptographics_logo.png";
import Image from "next/image";
import Link from "next/link";
const AboutPage = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant='h4' gutterBottom sx={{ fontWeight: "bold" }}>
          About Us
        </Typography>
        <Typography variant='h6' color='text.secondary'>
          Who We Are
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant='body1' paragraph>
          As a fashion studio and clothing manufacturing unit, our mission is to
          provide outstanding clothing designs that are fashionable and nurture
          an inventory of unique fashion products. We, at Fashion Studio Urban
          Purple (FSUP), firmly believe in providing the guiding light for
          apparel brands and private clothing labels to create products with
          fundamentally better techniques. This approach has been our
          cornerstone of success and has enabled us to bring over 200 private
          labels to life.
        </Typography>
        <Typography variant='body1' paragraph>
          We are a one-stop destination for designers, offering services from
          Concept to Consumer. Our designs are unique and inspirational;
          delivering a collection line that can propel any brand en route to
          success.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant='h5' gutterBottom>
          Our Mission
        </Typography>
        <Typography variant='body1' paragraph>
          Our mission is to empower small and start-up clothing brands to
          achieve success. Urban Purple, with its parent company,
          ScriptoGraphics, and other dedicated affiliate companies, form a
          strong conglomerate committed to the construction and growth of small
          and start-up apparel businesses without any geographical boundaries.
        </Typography>
        <Typography variant='body1' paragraph>
          What we enjoy the most is supporting small and start-up brands with
          unique concepts and product lines that create cognizance about the
          collective small business voice. ScriptoGraphics and Urban Purple
          encourage patrons and prospective customers along with our overseas
          partners to ask questions and share experiences.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant='h5' gutterBottom>
          Board
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Paromita Das
                </Typography>
                <Typography variant='body2' color='text.secondary' paragraph>
                  Fashion Designer, Technical Designer, Managing Director –
                  Urban Purple
                </Typography>
                <Typography variant='body2'>
                  Paromita began her career as a fashion designer in various
                  industries and co-operative societies. With more than 14 years
                  of experience in various apparel industry environments, she
                  heads the Design Department of Urban Purple.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Sashikant Khuntia
                </Typography>
                <Typography variant='body2' color='text.secondary' paragraph>
                  Head Marketing and Public Relation – Urban Purple MD – Scripto
                  Graphics
                </Typography>
                <Typography variant='body2'>
                  Sashikant is focused on Marketing and Public Relation specific
                  to the Apparel Industry. With 16 years of experience, he has
                  been active in both the IT and apparel industries.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Typography variant='h5' gutterBottom>
          Our Partner Company
        </Typography>
        <Link href='https://www.scriptographics.com/' target='_blank'>
          <Image src={scriptographicsLogo} alt='logo' height={80} />
        </Link>
        <Typography variant='body1' paragraph>
          ScriptoGraphics is a newly formed technology company with a strong
          base of product lines related to apparel design and production.
          Founded and operated by Sashikant Khuntia and Shivaprasad B.R,
          ScriptoGraphics is coming up with a lot of automation related to
          apparel design, tech pack, and garment manufacturing software.
        </Typography>
      </Box>
    </Box>
  );
};
export default AboutPage;

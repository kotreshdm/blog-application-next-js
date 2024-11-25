import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import img2 from "@/public/images/img2.svg";
import img4 from "@/public/images/img4.svg";
import img5 from "@/public/images/img5.svg";
import img6 from "@/public/images/img6.png";

export default function HomePageSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const sections = [
    {
      title: "Who Are We?",
      description:
        "We are a team of expert tech pack designers, pattern makers, and garment fit technicians dedicated to bringing your fashion brand's vision to life. From concept to customer, we provide comprehensive support in fashion production, ensuring every detail is meticulously crafted. Specializing in detailed tech packs, we ensure your designs are production-ready. Let us be your trusted partner in creating your dream collection.",
      img: img6,
    },
    {
      title: "What We Do?",
      description:
        "We offer a comprehensive tech pack service, digital pattern-making, and production consultation for brands that are just starting out and have a limited budget. Our goal is to help optimize production through detailed planning, resulting in a seamless apparel production process that can give upcoming brands the initial boost they need. As expert tech pack designers, we guarantee that your designs are accurate and production-ready.",
      img: img5,
    },
    {
      title: "Who We Do It For?",
      description:
        "As a tech pack service provider, we work with clients in the USA, Europe, the Middle East, and Asia. Our main client base consists of fashion startups focusing on starting a brand and established brands wanting to launch their seasonal collection. We are the creative and technical design partners for clients' beginnings and specialists in converting their innovative ideas into a factory-understandable technical document. Our tech pack service is second to none in the world.",
      img: img2,
    },
    {
      title: "How We Do It?",
      description:
        "We believe in active participation with our clients, starting from collection design, finalization, and tech pack development. We ensure that our technical design team and clients are in sync and develop a collection that reflects our client's vision while optimizing production. From design finalization to the completion of tech packs, we keep our clients in the loop on every step we take to prepare fashion tech packs for their collections.",
      img: img4,
    },
  ];

  return (
    <>
      {sections.map((section, index) => (
        <Container
          key={index}
          maxWidth='100%'
          sx={{
            bgcolor: "#FDF8F3",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 1,
            }}
          >
            {/* Left content */}
            {index % 2 === 0 ? (
              <>
                <Box sx={{ flex: { md: 1 } }} xs={12} md={6}>
                  <Typography
                    variant='h2'
                    component='h2'
                    sx={{
                      fontSize: { xs: "2.5rem", md: "3.5rem" },
                      fontWeight: 700,
                      color: "#1A1A1A",
                    }}
                  >
                    {section.title}
                  </Typography>

                  <Typography
                    variant='body1'
                    sx={{
                      color: "#666",
                      fontSize: "1.1rem",
                      maxWidth: "98%",
                      lineHeight: 1.6,
                    }}
                  >
                    {section.description}
                  </Typography>

                  <Button
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      textTransform: "none",
                      color: "#2264E5",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>

                {/* Right content - Images */}
                <Box
                  sx={{
                    flex: { md: 1 },
                    position: "relative",
                    width: "100%",
                    height: "500px", // Adjust height based on screen size
                  }}
                  xs={12}
                  md={6}
                >
                  <Image
                    src={section.img}
                    alt={section.title}
                    fill
                    objectFit='cover'
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </>
            ) : (
              <>
                {/* Image first for odd sections */}
                <Box
                  sx={{
                    flex: { md: 1 },
                    position: "relative",
                    width: "100%",
                    height: "500px", // Adjust height based on screen size
                  }}
                  xs={12}
                  md={6}
                >
                  <Image
                    src={section.img}
                    alt={section.title}
                    fill
                    objectFit='cover'
                    // style={{ objectFit: "cover" }}
                  />
                </Box>

                {/* Right content */}
                <Box sx={{ flex: { md: 1 }, ml: 2 }} xs={12} md={6}>
                  <Typography
                    variant='h2'
                    component='h2'
                    sx={{
                      fontSize: { xs: "2.5rem", md: "3.5rem" },
                      fontWeight: 700,
                      color: "#1A1A1A",
                    }}
                  >
                    {section.title}
                  </Typography>

                  <Typography
                    variant='body1'
                    sx={{
                      color: "#666",
                      mb: 4,
                      fontSize: "1.1rem",
                      maxWidth: "98%",
                      lineHeight: 1.6,
                    }}
                  >
                    {section.description}
                  </Typography>

                  <Button
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      textTransform: "none",
                      color: "#2264E5",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Container>
      ))}
    </>
  );
}

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import Link from "next/link";

// Services Array
const services = [
  {
    title: "Concept Development",
    description:
      "When you have a raw idea and need help developing it into a viable product, our professional team can help you give shape to your concept that your customers will love.",
  },
  {
    title: "Apparel Design",
    description:
      "Our collection line sheets are unique and complement the brand identity. Technical designers prepare fashion flat sketches based on your brand concept, ensuring your vision is achieved.",
  },
  {
    title: "Tech Pack Design Service",
    description:
      "We create detailed production-ready tech packs, including garment specifications, fabric details, trims, color, and measurement spec sheets, which are essential for efficient manufacturing.",
  },
  {
    title: "Sample Development",
    description:
      "We offer sample development services to create a 100% accurate garment style. Our process ensures you have a precise sample to reproduce consistently during production.",
  },
  {
    title: "Clothing Manufacturing",
    description:
      "With our in-house manufacturing unit, we provide end-to-end manufacturing services, including shipping, allowing brands to focus on marketing while we handle production and logistics.",
  },
  {
    title: "Apparel Branding",
    description:
      "We help turn your raw ideas into meaningful concepts that resonate with consumers, ensuring your brand is well-positioned for success in the market.",
  },
];

const ServicesPage = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box sx={{ marginBottom: 4, textAlign: "justify" }}>
        <Typography variant='h4' gutterBottom>
          Fashion Design and Development Services
        </Typography>
        <Typography variant='h6' color='text.secondary' sx={{ p: 2 }}>
          Bringing a successful fashion brand to market is no simple task.
          Developing a sketch into a finished product can be long, expensive and
          frustrating. You need experienced technical fashion consultant to
          consult and assist you. We can help you bring your ideas to a
          successful fashion brand. We guide you in developing a sketch in to a
          finish product. It takes combination of interdependent factors to
          bring success to your brand. So, you need right professional to work
          on your ideas. We can help you to turn your concept into a your dream
          product!
        </Typography>
        <Typography variant='h6' color='text.secondary' sx={{ p: 2 }}>
          At Fashion Studio Urban Purple, We have fashion technical designers,
          Pattern Makers and a complete sampling unit. Here we insure that a
          team specialist in your product category develop your product. We
          specialize in womenswear, menswear, kidswear, activewear and lingerie.
          We have specialist tech pack designers and pattern makers for the
          above category working with us. Below is our complete range of fashion
          development services.
        </Typography>
        <Typography variant='h6' color='text.secondary' sx={{ p: 2 }}>
          We not only give advise and leave you on your way but also support you
          in every step. Our core value is to guide you on the business from
          beginning to the end of a complete life cycle. We offer service from
          Concept to customer. We are one step solution for your business need
          starting from concept to customer. An one step shop for all your
          product needs so that you can focus on selling and building your
          business. By outsourcing design, tech pack and production service to
          Urban Purple, you can reduce your operating cost by an average of 30%
          net and you can expand your product offering.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  {service.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{ padding: 4, backgroundColor: "#f1f1f1", borderRadius: 2, mt: 4 }}
      >
        <Grid container alignItems='center' spacing={2}>
          {/* Left Side Content */}
          <Grid item xs={12} md={8}>
            <Typography variant='body1'>
              Interested in working with us? Or got a question? Maybe just want
              to say hello?
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{ textAlign: { xs: "center", md: "right" } }}
          >
            <Link href='/contact'>
              <Button variant='contained' color='primary' size='large'>
                Contact Us
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ServicesPage;

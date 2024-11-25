import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import techpack1 from "@/public/images/techpack1.png";
import techpack2 from "@/public/images/techpack2.png";
import techpack3 from "@/public/images/techpack3.png";
import sample1 from "@/public/images/sample1.png";
import sample2 from "@/public/images/sample2.png";
import sample3 from "@/public/images/sample3.png";
import Image from "next/image";
import {
  ListItemLi,
  PageHeading,
  ListItemUl,
} from "@/components/styledComp/styledComp";
const sample = [sample1, sample2, sample3];

const techpacks = [
  {
    heading: "Apparel Design",
    title: "Tech Pack Design Requirement",
    description1:
      "As an apparel brand or a creative designer, your thoughts and vision need to be translated lucidly and accurately to help create the best fit solution for your requirement. We at Fashion Studio Urban Purple encourage a two way communication between the client and our designers, be it through sketches or references from the web, ensuring ideal technical designs and specification sheets",
    description2:
      "Our tech pack designers at Fashion Studio Urban Purple have the experience of managing a multitude of clients and are fully equipped to understand, analyze and convert your creative vision to factory ready tech packs. Most importantly, we re-iterate the importance of transferring the initial design/ idea coherently to our design team, allowing us to take it from there and process it faster.",
    description3:
      "In short, we take your idea in its raw form and convert it to factory ready tech packs.",
    list: [],
    img: techpack1,
    buttenText: "Contact Us",
  },
  {
    heading: "Clothing Tech Packs",
    title: "Why You Need a Tech Pack",
    img: techpack2,
    buttenText: "Get a Quote",
    description1:
      "Tech packs significantly reduce the time and effort required to produce your garments. Apparel tech packs perceptively expedite the manufacturing process by providing information that adapts to your style requirement. A well-made tech pack saves time and money by way of systematic construction detailing",
    description2:
      "It comes as no surprise that most professional and reputed garment manufacturing units insist on having well-constructed apparel tech packs to maximize productivity.",
    listHeading: "Tech Pack's construction detailing:",
    list: [
      "Integrates all information that a manufacturer needs to produce your garment",
      "Ensures manufacturer and apparel brand are on the same page",
      "Leads to more accuracy and fewer rejections",
      "Saves Time and Money",
      "Protects against misinterpretation on style detailing",
      "Expressively improves efficiency and productivity",
      "Works as a de-facto contract between manufacturer and the client",
    ],
  },

  {
    heading: "Tech Pack Design Process",
    title: "Getting Started",
    description1:
      "We need the entailed information from you to get started. Please send us your requirement with responses to the below stated queries:",
    description2: (
      <>
        Be more informed on our practices. Please refer to our blog{" "}
        <a
          href='https://clothingtechpack.blogspot.com/'
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: "blue", cursor: "pointer" }}
        >
          Tech Pack Design
        </a>{" "}
        for a comprehensive understanding on how we help start-ups and designers
        succeed.
      </>
    ),
    list: [
      "Number of styles you want to start with",
      "Brand name, logo if any",
      "Proposed start date and deadline of the project",
      "Approximate budget earmarked for the collection/design",
      "Base size guide (Hint: Easily available on similar/competitors' size guides)",
      "Contact details - email, Skype or contact number; in case we need to speak to you for further clarifications",
      <>
        Please send back the completed form to{" "}
        <a
          href='mailto:designer@paromitadas.com'
          style={{ color: "blue", cursor: "pointer" }}
        >
          designer@paromitadas.com
        </a>{" "}
      </>,
    ],
    img: techpack3,
    buttenText: "Get In Touch",
  },
];
const TechPackPage = () => {
  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", padding: 4 }}>
      <Box>
        <PageHeading>
          Apparel Design Studio | Tech Pack Designer | Manufacturer & Exporter
          of ReadyMade Garments
        </PageHeading>
        <Typography
          variant='body1'
          sx={{ color: "text.secondary", marginBottom: 3 }}
        >
          It is imperative that one sets things in place before putting out
          investments on a large scale production plan. Apparel Tech Packs set
          standards, processes and guidelines that clothing manufacturers can
          chart and track in order to physically sample the production pieces as
          designed by the clothing designer. Tech Packs augment the essential
          technicalities to fashion design sketches making it production ready.
        </Typography>
        <Typography
          variant='body1'
          sx={{ color: "text.secondary", marginBottom: 3 }}
        >
          Fashion Studio Urban Purple provides you with right product detailing
          and specifications in the form of apparel tech packs that you can use
          to produce your garments. Our technical designers progressively
          examine the styles and conduct exhaustive analysis prior to designing
          the tech pack. We then deliver precise and production friendly apparel
          tech packs, making life easier for you and the eventual manufacturing
          house. We understand that your vision needs certain technicalities; we
          equip you with the required technical design assistance enabling your
          vision become a reality.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {techpacks.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography
                variant='h5'
                sx={{ p: 2, backgroundColor: "blue", color: "#fff" }}
              >
                {feature.heading}
              </Typography>
              <Image
                src={feature.img}
                alt={feature.title}
                style={{
                  width: "75%",
                  margin: "0 auto",
                  height: "auto",
                  borderRadius: "4px 4px 0 0",
                }}
              />
              <CardContent>
                <Typography
                  variant='h6'
                  sx={{ fontWeight: "normal", marginBottom: 1 }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ p: 1 }}
                >
                  {feature.description1}
                </Typography>
                <ListItemUl style={{ padding: "16px" }}>
                  {feature.listHeading}
                  {feature.list.map((item) => (
                    <ListItemLi key={item}>{item}</ListItemLi>
                  ))}
                </ListItemUl>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ p: 1 }}
                >
                  {feature.description2}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ p: 1 }}
                >
                  {feature.description3}
                </Typography>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  href='/contact'
                >
                  {feature.buttenText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box>
        <PageHeading>Samples Tech Pack Designs</PageHeading>
        <Box display={"flex"} justifyContent={"space-around"}>
          {sample.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt={`Sample ${index}`}
              width={300}
              height={300}
            />
          ))}
        </Box>
      </Box>
      <Box>
        <PageHeading>What Constitutes an Clothing Tech Pack</PageHeading>
        <ListItemUl>
          <ListItemLi>
            Rendered Illustration - Flat Sketch (Front View - Back View)
          </ListItemLi>
          <ListItemLi>
            Color Combo - Various Color Options of the Garments (As per Client
            Need)
          </ListItemLi>
          <ListItemLi>
            Stitching & Construction Detailing (Both Front and Back)
          </ListItemLi>
          <ListItemLi>
            Graphic / Print Detailing Including Pantone Color (Style Dependent)
          </ListItemLi>
          <ListItemLi>
            Embroidery / Appliqué / Other Embellishment Detailing
          </ListItemLi>
          <ListItemLi>
            Washing Detailing (Wash Care and Other Washing - Ironing and Care
            Instructions)
          </ListItemLi>
          <ListItemLi>
            Trims & Packaging Detailing (As per Client Requirement)
          </ListItemLi>
          <ListItemLi>Branding Details</ListItemLi>
          <ListItemLi>
            Graphical Measurement Details with Spec-Sheet Pointers
          </ListItemLi>
          <ListItemLi>
            Measurement Spec Sheet and Size Gradation (Size Gradation as per
            Client Requirement)
          </ListItemLi>
        </ListItemUl>
      </Box>
      <Box>
        <PageHeading>Tech Pack Design Process</PageHeading>
        <ListItemUl>
          <ListItemLi>
            You may send sketches or inspiration pictures of your styles to
            create technical apparel design (Tech Pack and Spec Sheet).
          </ListItemLi>
          <ListItemLi>
            We would first go ahead with styling and submit the flat sketch to
            you (client) for approval and their comments and inputs.
          </ListItemLi>
          <ListItemLi>
            We provide all technical apparel design files through Adobe Reader
            (PDF) files and the spec sheet in an Excel sheet.
          </ListItemLi>
          <ListItemLi>
            Once we receive the comments and inputs, we would proceed with
            modifications and give the final flats for approval. We would also
            require the colorways for the styles.
          </ListItemLi>
          <ListItemLi>
            Once the flat sketches are approved and the colorways for the styles
            are finalized, we would proceed with the technical design of the
            garments.
          </ListItemLi>
          <ListItemLi>
            We would require the logo, trims design, and branding detailing from
            your end (vectors) if you have created them. If not, and you want us
            to do the branding for you, we can provide this service.
          </ListItemLi>
          <ListItemLi>
            Once the flat sketches are approved and we proceed with the tech
            pack detailing, we would not accept any changes in between as we
            would have to change the whole detailing all over again.
          </ListItemLi>
          <ListItemLi>
            For apparel tech packs related queries, use our contact form to
            reach us.
          </ListItemLi>
          <ListItemLi>
            For the production of your clothing line, you may get in touch with
            us with your tech packs and spec sheets.
          </ListItemLi>
          <ListItemLi>
            We need the tech packs of your styles to give you a quote for
            apparel production. Tech packs are important, and without them, the
            production quote would be incomplete.
          </ListItemLi>
        </ListItemUl>
      </Box>
      <Box>
        <Typography variant='h6'>
          For Apparel Tech Pack and Related Queries Please use our Contact form
          to Reach Us.
        </Typography>
        <Typography variant='body'>
          For any production related enquiry, we urge you to get in touch with
          us with your tech packs and spec sheets We will require the tech packs
          of your styles in order to provide you with a quote for apparel
          production. Tech Packs are vital and without it the production quote
          would be incomplete.
        </Typography>
      </Box>
    </Box>
  );
};

export default TechPackPage;

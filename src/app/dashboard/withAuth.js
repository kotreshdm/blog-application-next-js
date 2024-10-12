import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const withAuth = (Component) => {
  return (props) => {
    const { data: session, status } = useSession();

    if (status === "loading") {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    if (!session?.user) {
      return (
        <Container maxWidth='sm'>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              textAlign: "center",
            }}
          >
            <ErrorOutlineIcon
              sx={{ fontSize: 100, color: "warning.main", mb: 2 }}
            />
            <Typography variant='h1' component='h1' gutterBottom>
              403
            </Typography>
            <Typography variant='h4' component='h2' gutterBottom>
              Access Denied
            </Typography>
            <Typography variant='body1' sx={{ mb: 2 }}>
              Please log in to access this page.
            </Typography>
            <Link
              href={`/api/auth/signin?callbackUrl=${encodeURIComponent(
                window.location.href
              )}`}
              passHref
            >
              <Button variant='contained' color='primary'>
                Login
              </Button>
            </Link>
          </Box>
        </Container>
      );
    }

    return <Component {...props} />;
  };
};

export default withAuth;

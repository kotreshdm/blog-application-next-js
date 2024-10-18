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

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
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

    if (!session?.user?.role?.includes("admin")) {
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
              You do not have permission to access this page.
            </Typography>
            <Link href='/' passHref>
              <Button variant='contained' color='primary'>
                Go to Home
              </Button>
            </Link>
          </Box>
        </Container>
      );
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

  return AuthComponent;
};

// Helper function to get the display name of a component
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;

import { Box, Button, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
        <div style={{ textAlign: "center" }}>
          <div>Access denied. Please log in.</div>
          <Link
            href={`/api/auth/signin?callbackUrl=${encodeURIComponent(
              window.location.href
            )}`}
            passHref
          >
            <Button
              variant='contained'
              color='primary'
              style={{ marginTop: "1rem" }}
            >
              Login
            </Button>
          </Link>
        </div>
      );
    }

    return <Component {...props} />;
  };
};

export default withAuth;

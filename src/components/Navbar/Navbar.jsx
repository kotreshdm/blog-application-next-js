import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { keyframes } from "@mui/system";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { toTitleCase } from "@/utils/helperFunctions/toTitleCase";

const sunRotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const moonBounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
`;

export default function Navbar({ darkMode, toggleDarkMode }) {
  const { data: session, status, loading } = useSession();

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          <Link
            style={{
              textTransform: "capitalize",
              color: "#fff",
              textDecoration: "none",
            }}
            href='/'
          >
            Techpack desiginers
          </Link>
        </Typography>
        {status === "authenticated" ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              href='/dashboard'
              style={{
                textTransform: "capitalize",
                color: "#fff",
                textDecoration: "none",
                marginRight: "15px",
              }}
            >
              {toTitleCase(session.user.name) || session.user.email} Dashboard
            </Link>
            <Button
              variant='outlined'
              color='inherit'
              sx={{ textTransform: "capitalize" }}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </Button>
          </Box>
        ) : (
          <>
            <Link href='/login' style={{ textDecoration: "none" }}>
              <Button
                color='inherit'
                sx={{
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Login
              </Button>
            </Link>
            <Link
              href='/register'
              style={{ textDecoration: "none", marginRight: "15px" }}
            >
              <Button
                color='inherit'
                sx={{
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Register
              </Button>
            </Link>
          </>
        )}

        <IconButton
          onClick={toggleDarkMode}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          {darkMode ? (
            <LightModeIcon
              sx={{
                color: "#FFD700",
                animation: `${sunRotate} 10s linear infinite`,
                "&:hover": {
                  animationDuration: "3s",
                },
              }}
            />
          ) : (
            <DarkModeIcon
              sx={{
                color: "#C0C0C0",
                animation: `${moonBounce} 2s ease-in-out infinite`,
                "&:hover": {
                  animationDuration: "0.5s",
                },
              }}
            />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

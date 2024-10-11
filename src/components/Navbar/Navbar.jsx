import * as React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode"; // Sun icon for light mode
import DarkModeIcon from "@mui/icons-material/DarkMode"; // Moon icon for dark mode
import { keyframes } from "@mui/system";
import Link from "next/link";

// Define animations
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
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          <Link href='/'>My MUI App</Link>
        </Typography>
        <Link
          href='/login'
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

        <IconButton
          onClick={toggleDarkMode}
          sx={{
            mr: 2,
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

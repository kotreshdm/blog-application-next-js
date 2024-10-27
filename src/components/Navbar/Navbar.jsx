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
import { useDispatch } from "react-redux";
import { closeAllBlogsDialogs } from "@/config/redux/blogSlice/blogSlice";
import { closeAllCategoriesDialogs } from "@/config/redux/categorySlice/categorySlice";
import Image from "next/image";
import logo from "@/public/images/logo.png";

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
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Tech Pack", href: "/tech-pack" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Manufacturing", href: "/manufacturing" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];
export default function Navbar({ darkMode, toggleDarkMode }) {
  const { data: session, status, loading } = useSession();

  const dispatch = useDispatch();

  React.useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    return () => {
      dispatch(closeAllBlogsDialogs());
      dispatch(closeAllCategoriesDialogs());
    };
  }, [darkMode, dispatch]);
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
            <Image src={logo} alt='logo' height={40} />
          </Link>
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 2,
          }}
        >
          {navLinks.map((nav) => (
            <Link
              key={nav.name}
              href={nav.href}
              style={{
                textDecoration: "none",
                color: "inherit",
                marginRight: "15px",
              }}
            >
              <Button color='inherit' sx={{ textTransform: "capitalize" }}>
                {nav.name}
              </Button>
            </Link>
          ))}
        </Box>
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
              {/* {toTitleCase(session.user.name) || session.user.email} */}
              Dashboard
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
            {/* <Link href='/login' style={{ textDecoration: "none" }}>
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
            </Link> */}
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

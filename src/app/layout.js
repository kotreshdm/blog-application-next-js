"use client"; // Required to use client-side hooks

import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar/Navbar";

function getInitialDarkMode() {
  if (typeof window !== "undefined") {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      return savedMode === "dark";
    }
    // If no saved preference, you can check user's system preference
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }
  // Default to false for server-side rendering
  return false;
}

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    // Update localStorage when darkMode changes
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  // Force a re-render on the client side to ensure correct initial state
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <html lang='en'>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

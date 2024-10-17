"use client"; // Required to use client-side hooks

import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import ReactReduxProvider from "@/utils/ReactReduxProvider";

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
        <ReactReduxProvider>
          <SessionProvider>
            <ThemeProvider theme={theme}>
              <Toaster
                toastOptions={{
                  duration: 5000,
                  style: {
                    animation: "fade-out 0.6s, fade-in 0.6s",
                  },
                  position: "top-center",
                  dismissible: true,
                  closeButton: true,
                }}
              />
              <CssBaseline />
              <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              {children}
            </ThemeProvider>
          </SessionProvider>
        </ReactReduxProvider>
      </body>
    </html>
  );
}

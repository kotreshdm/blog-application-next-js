"use client";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import ReactReduxProvider from "@/utils/ReactReduxProvider";
import AppFooter from "@/components/appFooter/AppFooter";
import "../app/globals.css";
function getInitialDarkMode() {
  if (typeof window !== "undefined") {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      return savedMode === "dark";
    }
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }
  return false;
}

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <html lang="en">
      <body style={{ height: "100vh", overflowY: "auto" }}>
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
              <AppFooter />
            </ThemeProvider>
          </SessionProvider>
        </ReactReduxProvider>
      </body>
    </html>
  );
}

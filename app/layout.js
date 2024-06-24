"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ThemeProvider } from "@/context/theme";
import TopNav from "@/components/nav/TopNav";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <SessionProvider>
          <ThemeProvider>
            <TopNav />
            <Toaster />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

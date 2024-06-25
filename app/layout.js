"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ThemeProvider } from "@/context/theme";
import TopNav from "@/components/nav/TopNav";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { BlogProvider } from "@/context/blog";

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <SessionProvider>
          <ThemeProvider>
            <BlogProvider>
              <TopNav />
              <Toaster />
              {children}
            </BlogProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

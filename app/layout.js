"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";
import TopNav from "@/components/nav/TopNav";
import { ThemeProvider } from "@/context/theme";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <SessionProvider>
        <ThemeProvider>
          <body>
            <TopNav />
            {children}
          </body>
        </ThemeProvider>
      </SessionProvider>
    </html>
  );
}

"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ThemeProvider } from "@/context/theme";
import TopNav from "@/components/TopNav";

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider>
          <TopNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

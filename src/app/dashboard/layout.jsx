"use client";
import { Box } from "@mui/material";
import withAuth from "./withAuth";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

function ProtectedLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <DashboardNavbar />
      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: "background.default", pl: 3 }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default withAuth(ProtectedLayout);

"use client";
import LeftMenu from "@/components/dashboard/LeftMenu";
import { Box } from "@mui/material";
import withAuth from "./withAuth";

function ProtectedLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <LeftMenu />
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

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Category as CategoryIcon,
  Article as ArticleIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Categories", icon: <CategoryIcon />, path: "/dashboard/categories" },
  { text: "Blogs", icon: <ArticleIcon />, path: "/dashboard/blogs" },
];

const LeftMenu = () => {
  const pathname = usePathname();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        zIndex: 999,
      }}
      variant='permanent'
      anchor='left'
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <Link
            href={item.path}
            key={item.text}
            passHref
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem button selected={pathname === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default LeftMenu;

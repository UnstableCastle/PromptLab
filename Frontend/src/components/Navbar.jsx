import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  IconButton,
  Avatar,
  InputAdornment,
  Drawer,
  ListItemButton,
  ListItemText,
  Divider,
  List,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function Navbar({ onLogout = () => {} }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "#000",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Sidebar
          mobile
          onClose={() => {
            setOpenDrawer(false);
          }}
          onLogout={() => {
            setOpenDrawer(false);
            onLogout();
          }}
        />
      </Drawer>
      <Toolbar
        sx={{
          px: { xs: 1.5, sm: 2, md: 4 },
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
          // Never let the two sections wrap onto separate lines -
          // instead each section shrinks internally (see minWidth:0 below).
          flexWrap: "nowrap",
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, md: 3, lg: 5 },
            minWidth: 0, // allows children (Tabs) to shrink instead of overflowing
            flexShrink: 1,
          }}
        >
          {/* Mobile Menu */}
          <IconButton
            onClick={() => setOpenDrawer(true)}
            sx={{
              display: { xs: "flex", md: "none" },
              flexShrink: 0,
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            noWrap
            sx={{
              fontWeight: "bold",
              color: "#4f46e5",
              fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.6rem" },
              flexShrink: 0,
            }}
          >
            PromptLab
          </Typography>

          {/* Desktop Tabs */}
          <Tabs
            value={0}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons={false}
            sx={{
              display: { xs: "none", md: "flex" },
              minWidth: 0,
              "& .MuiTab-root": {
                minWidth: "auto",
                px: { md: 1.25, lg: 2 },
                fontSize: { md: "0.8rem", lg: "0.875rem" },
              },
            }}
          >
            <Tab label="Trending" />
            <Tab label="Newest" />
            <Tab label="Top Rated" />
          </Tabs>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, md: 1.5 },
            flexShrink: 0, // icons/avatar never get squeezed out
          }}
        >
          {/* Search */}
          <TextField
            size="small"
            placeholder="Search prompts..."
            sx={{
              display: { xs: "none", sm: "block" },
              width: { sm: 140, md: 200, lg: 280 },
              transition: "width 0.2s ease",
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Search Icon for Mobile */}
          <IconButton
            sx={{
              display: { xs: "flex", sm: "none" },
            }}
          >
            <SearchIcon />
          </IconButton>

          <IconButton size="small">
            <NotificationsNoneOutlinedIcon />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
          >
            <HelpOutlineOutlinedIcon />
          </IconButton>

          <Avatar
            onClick={() => navigate("/profile")}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQgb_spLXULC16C_WrcsS5YL_8O3wpw-8DJki_5-4AQ&s"
            sx={{
              width: { xs: 32, md: 38 },
              height: { xs: 32, md: 38 },
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  alpha,
} from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import CallSplitOutlinedIcon from "@mui/icons-material/CallSplitOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar({ mobile = false, onLogout = () => {}, onClose = () => {} }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log(user,"s=s=s=s=s=s=s=s")
  return (
    <Box
      sx={{
        // In the mobile Drawer, fill its width; on desktop use a fixed rail width.
        width: mobile ? { xs: 260, sm: 280 } : 260,
        height: mobile ? "100vh" : "calc(100vh - 64px)",
        borderRight: mobile ? "none" : "1px solid #E5E7EB",
        bgcolor: "#fff",
        p: { xs: 1.5, md: 2 },
        position: mobile ? "static" : "sticky",
        top: mobile ? 0 : 64,
        // When rendered standalone (not inside the Navbar's Drawer), hide
        // below md since the Drawer + hamburger menu takes over there.
        display: mobile ? "flex" : { xs: "none", md: "flex" },
        flexDirection: "column",
        flexShrink: 0,
        overflowY: "auto",
      }}
    >
      {/* Top Section */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            color: "text.secondary",
            mb: 1,
            fontWeight: 600,
            px: 1,
          }}
        >
          Discover
        </Typography>

        <List onClick={onClose} sx={{ py: 0 }}>
          <ListItemButton
            onClick={() => navigate("/dashboard")}
            selected
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <HomeOutlinedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              navigate("/createPost");
            }}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <TrendingUpOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Trending" />
          </ListItemButton>

          <ListItemButton sx={{ borderRadius: 2, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <StarBorderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Top Rated" />
          </ListItemButton>

          <ListItemButton sx={{ borderRadius: 2, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <CallSplitOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Most Forked" />
          </ListItemButton>

          <ListItemButton sx={{ borderRadius: 2, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <WhatshotOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Rising" />
          </ListItemButton>

          {user.role === "ROLE_ADMIN" && (
            <ListItemButton onClick={()=>{

              console.log("Current User:", user);
console.log("Role:", user?.role);
              navigate("/admin-dashboard")
            }} sx={{ borderRadius: 2, mb: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <WhatshotOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItemButton>
          )}
        </List>
      </Box>

      {/* Push Logout to Bottom */}
      <Box sx={{ mt: "auto" }}>
        <Divider />

        <List sx={{ py: 0.5 }}>
          <ListItemButton
            onClick={onLogout}
            sx={{
              borderRadius: 2,
              color: "error.main",
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutOutlinedIcon color="error" />
            </ListItemIcon>

            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;
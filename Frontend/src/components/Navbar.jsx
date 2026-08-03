// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Tabs,
//   Tab,
//   TextField,
//   IconButton,
//   Avatar,
//   InputAdornment,
//   Drawer,
//   ListItemButton,
//   ListItemText,
//   Divider,
//   List,
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import Sidebar from "./Sidebar";
// import { useNavigate } from "react-router-dom";

// function Navbar({ onLogout = () => {} }) {
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <AppBar
//       position="sticky"
//       elevation={0}
//       sx={{
//         bgcolor: "#fff",
//         color: "#000",
//         borderBottom: "1px solid #E5E7EB",
//       }}
//     >
//       <Drawer
//         anchor="left"
//         open={openDrawer}
//         onClose={() => setOpenDrawer(false)}
//       >
//         <Sidebar
//           mobile
//           onClose={() => {
//             setOpenDrawer(false);
//           }}
//           onLogout={() => {
//             setOpenDrawer(false);
//             onLogout();
//           }}
//         />
//       </Drawer>
//       <Toolbar
//         sx={{
//           px: { xs: 1.5, sm: 2, md: 4 },
//           display: "flex",
//           justifyContent: "space-between",
//           gap: 1,
//           // Never let the two sections wrap onto separate lines -
//           // instead each section shrinks internally (see minWidth:0 below).
//           flexWrap: "nowrap",
//         }}
//       >
//         {/* Left Section */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: { xs: 1, md: 3, lg: 5 },
//             minWidth: 0, // allows children (Tabs) to shrink instead of overflowing
//             flexShrink: 1,
//           }}
//         >
//           {/* Mobile Menu */}
//           <IconButton
//             onClick={() => setOpenDrawer(true)}
//             sx={{
//               display: { xs: "flex", md: "none" },
//               flexShrink: 0,
//             }}
//           >
//             <MenuIcon />
//           </IconButton>

//           {/* Logo */}
//           <Typography
//             noWrap
//             sx={{
//               fontWeight: "bold",
//               color: "#4f46e5",
//               fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.6rem" },
//               flexShrink: 0,
//             }}
//           >
//             PromptLab
//           </Typography>

//           {/* Desktop Tabs */}
//           <Tabs
//             value={0}
//             textColor="primary"
//             indicatorColor="primary"
//             variant="scrollable"
//             scrollButtons={false}
//             sx={{
//               display: { xs: "none", md: "flex" },
//               minWidth: 0,
//               "& .MuiTab-root": {
//                 minWidth: "auto",
//                 px: { md: 1.25, lg: 2 },
//                 fontSize: { md: "0.8rem", lg: "0.875rem" },
//               },
//             }}
//           >
//             <Tab label="Trending" />
//             <Tab label="Newest" />
//             <Tab label="Top Rated" />
//           </Tabs>
//         </Box>

//         {/* Right Section */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: { xs: 0.5, md: 1.5 },
//             flexShrink: 0, // icons/avatar never get squeezed out
//           }}
//         >
//           {/* Search */}
//           <TextField
//             size="small"
//             placeholder="Search prompts..."
//             sx={{
//               display: { xs: "none", sm: "block" },
//               width: { sm: 140, md: 200, lg: 280 },
//               transition: "width 0.2s ease",
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "30px",
//               },
//             }}
//             slotProps={{
//               input: {
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon color="action" fontSize="small" />
//                   </InputAdornment>
//                 ),
//               },
//             }}
//           />

//           {/* Search Icon for Mobile */}
//           <IconButton
//             sx={{
//               display: { xs: "flex", sm: "none" },
//             }}
//           >
//             <SearchIcon />
//           </IconButton>

//           <IconButton size="small">
//             <NotificationsNoneOutlinedIcon />
//           </IconButton>

//           <IconButton
//             size="small"
//             sx={{
//               display: { xs: "none", sm: "flex" },
//             }}
//           >
//             <HelpOutlineOutlinedIcon />
//           </IconButton>

//           <Avatar
//             onClick={() => navigate("/profile")}
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiQgb_spLXULC16C_WrcsS5YL_8O3wpw-8DJki_5-4AQ&s"
//             sx={{
//               width: { xs: 32, md: 38 },
//               height: { xs: 32, md: 38 },
//               cursor: "pointer",
//               flexShrink: 0,
//             }}
//           />
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Navbar;



import React, { useState } from "react";
import { useSelector } from "react-redux"; // 1. Added missing import
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  Avatar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

// Material UI Styled Components for the Search Bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  border: "1px solid #E2E8F0",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#64748B",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // 2. MOVED INSIDE THE COMPONENT: Hooks must be inside the function body
  const { user } = useSelector((state) => state.auth);
  
  // 3. Handled undefined variables:
  // A Navbar usually just shows the logged-in user, so 'viewedUser' isn't needed here.
  const profileData = user; 
  
  // Provide your actual backend URL here so the image source resolves correctly.
  const baseUrl = "http://localhost:8081"; 

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search?keyword=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "white", color: "black", boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>

        {/* Left Section: Menu and Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: "bold", color: "#4F46E5", cursor: "pointer" }}
            // onClick={() => navigate("/")}
          >
            PromptLab
          </Typography>
        </Box>

        {/* Right Section: Search and Icons */}
        <Box sx={{ display: "flex", alignItems: "center" }}>

          {/* Functional Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </Search>

          {/* Action Icons */}
          <Avatar
            alt="User Avatar"
            // Ensure profileData and profilePicture exist before appending to baseUrl
            src={profileData?.profilePicture ? `${baseUrl}${profileData.profilePicture}` : undefined}
            sx={{ width: 32, height: 32, cursor: "pointer", ml: 1 }}
            onClick={() => navigate("/profile")}
          />
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
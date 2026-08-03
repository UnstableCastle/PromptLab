import { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/auth/authThunk";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import LogoutDialog from "../pages/Home/LogoutDialog";

export default function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openLogout, setOpenLogout] = useState(false);

  return (
    <>
      {/* Navbar */}
      <Navbar onLogout={() => setOpenLogout(true)} />

      {/* Logout Dialog */}
      <LogoutDialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onLogout={() => {
          dispatch(logoutUser()).then((v) => {
            if (v.meta?.requestStatus === "fulfilled") {
              navigate("/", { replace: true });
            }
          });
        }}
      />

      {/* Main Layout */}
      <Box
        sx={{
          display: "flex",
          bgcolor: "#F8FAFC",
        }}
      >
        {/* Desktop Sidebar */}
        <Box
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
            width: 260,
            flexShrink: 0,
          }}
        >
          <Sidebar mobile={false} onLogout={() => setOpenLogout(true)} />
        </Box>

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            width: "100%",
            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            py: 3,
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

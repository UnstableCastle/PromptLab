import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import PromptItem from "../../components/PromptItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getPostById, toggleUpvote } from "../../redux/dashboard/dashboardThunk";
import PostDetailsDialog from "./PostDetailsDialogue";
import RightSidebar from "../../components/RightSidebar";
import LogoutDialog from "./LogoutDialog";
import { logoutUser } from "../../redux/auth/authThunk";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const { allPosts, post } = useSelector((state) => state.dashboard);
  const [postDet, setPostDet] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <>
      <Navbar onLogout={() => setOpenLogout(true)} />

      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 64px)",
          bgcolor: "#F8FAFC",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Sidebar mobile={false} onLogout={() => setOpenLogout(true)} />

        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0, 
            width: "100%",
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: "wrap",
              gap: { xs: 1.5, sm: 2 },
              mb: { xs: 3, md: 4 },
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" },
                lineHeight: 1.2,
              }}
            >
              Trending Prompts
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexShrink: 0,
              }}
            ></Box>
          </Box>

          <PostDetailsDialog
            open={postDet}
            onClose={() => setPostDet(false)}
            post={post || {}} 
          />

          <LogoutDialog
            open={openLogout}
            onClose={() => setOpenLogout(false)}
            onLogout={() => {
              dispatch(logoutUser()).then((v) => {
                if (v.meta.requestStatus === "fulfilled") {
                  navigate("/", { replace: true });
                }
              });
            }}
          />

          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {allPosts.map((cont, index) => (
              <Grid
                key={cont.id ?? index}
                size={{ xs: 12, sm: 6, lg: isLgUp ? 6 : 12 }}
              >
                <PromptItem
                  model={cont.modelInfo}
                  creatorName={cont.authorUsername}
                  avatar={cont.attachmentUrl}
                  title={cont.title}
                  liked={cont.hasUpvoted}
                  likes={cont.upvoteCount}
                  createdAt={cont.createdAt}
                  description={cont.promptText}
                  onClick={() => {
                    dispatch(getPostById(cont.id)).then((v) => {
                      if (v.meta.requestStatus === "fulfilled") {
                        setPostDet(true);
                      }
                    });
                  }}
                  
                  // THE FIX: Cleaned up to properly dispatch the optimistic update 
                  onUpvote={() => {
                    dispatch(toggleUpvote(cont.id));
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ display: { xs: "none", lg: "block" } }}>
          <RightSidebar posts={allPosts} />
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
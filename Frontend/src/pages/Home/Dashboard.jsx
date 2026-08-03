import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import PromptItem from "../../components/PromptItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  getPostById,
} from "../../redux/dashboard/dashboardThunk";
import PostDetailsDialog from "./PostDetailsDialogue";
import RightSidebar from "../../components/RightSidebar";
import LogoutDialog from "./LogoutDialog";
import { logoutUser } from "../../redux/auth/authThunk";
import CButton from "../../components/CButton";
import { Add, PlusOne } from "@mui/icons-material";
import { toggleUpvote } from "../../redux/posts/postThunk";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const { allPosts, post } = useSelector((state) => state.dashboard);
  const [postDet, setPostDet] = useState(false);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 64px)",
          bgcolor: "#F8FAFC",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
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
            >
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate("/create-post")}
                sx={{
                  borderRadius: "12px",
                  px: 3,
                  py: 1.2,
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  bgcolor: "#4F46E5",
                  boxShadow: "0 8px 20px rgba(79,70,229,0.25)",
                  "&:hover": {
                    bgcolor: "#4338CA",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 24px rgba(79,70,229,0.35)",
                  },
                  transition: "all .25s ease",
                }}
              >
                Create Post
              </Button>
            </Box>
          </Box>

          <PostDetailsDialog
            open={postDet}
            onClose={() => setPostDet(false)}
            post={post || {}}
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
                  avatar={cont.profilePicture}
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
                  onUpvote={() => {
                    // const postId = cont.id || cont.postId;
                    if (cont) {
                      dispatch(toggleUpvote({ route: "dashboard", id: cont.id }));
                    } else {
                      console.error("Failed to upvote: Post ID is missing.", cont);
                    }
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
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";
import PromptItem from "../../components/PromptItem";
import PostDetailsDialog from "../Home/PostDetailsDialogue";
import LogoutDialog from "../Home/LogoutDialog";

// Thunks
import { getPostById, toggleUpvote } from "../../redux/dashboard/dashboardThunk";
import { getPostsByUser } from "../../redux/profile/profileThunk";
import { logoutUser } from "../../redux/auth/authThunk";


function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to grab the router state

  // Clean reference to profile slice state matching your store structure
  // const userPosts = useSelector((state) => state.profile?.myposts || []);
  // const userPosts = useSelector((state) => state.profile?.viewedUserPosts || []);
  const post = useSelector((state) => state.dashboard?.post || {});
  const loading = useSelector((state) => state.loader?.loading || false);
  const userPosts = useSelector((state) => state.profile?.viewedUserPosts || []);
  const [postDet, setPostDet] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  // Fetch posts for the specific user when the component mounts or ID changes
  useEffect(() => {
    if (id) {
      // FIX 1: Pass id as part of an object alongside page and size
      dispatch(getPostsByUser({ id: id, page: 0, size: 10 }));
    }
  }, [dispatch, id]);

  // Safely derive the creator's info from Router State FIRST, then their first post, then fallback
  const routerState = location.state || {};
  const firstPost = userPosts?.length > 0 ? userPosts[0] : {};
  
  const creatorUsername = routerState.username || firstPost.authorUsername || firstPost.username || "PromptLab Creator";
  const creatorAvatar = routerState.avatar || firstPost.attachmentUrl || firstPost.avatar || "";

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
          {/* Post Details Dialog */}
          <PostDetailsDialog
            open={postDet}
            onClose={() => setPostDet(false)}
            post={post}
          />

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

          {/* Public Profile Header */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3, md: 4 },
              mb: { xs: 3, md: 4 },
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "center" },
              textAlign: { xs: "center", sm: "left" },
              gap: { xs: 2, sm: 3 },
            }}
          >
            <Avatar
              src={creatorAvatar}
              sx={{
                width: { xs: 88, sm: 96, md: 112 },
                height: { xs: 88, sm: 96, md: 112 },
                fontSize: { xs: "2rem", md: "2.5rem" },
                bgcolor: "primary.main",
                flexShrink: 0,
              }}
            >
              {creatorUsername?.charAt(0)?.toUpperCase()}
            </Avatar>

            <Box sx={{ minWidth: 0, width: "100%" }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                noWrap
                sx={{
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                }}
              >
                {creatorUsername}
              </Typography>

              <Stack
                direction="row"
                spacing={0.75}
                alignItems="center"
                justifyContent={{ xs: "center", sm: "flex-start" }}
                sx={{ mt: 0.75, color: "text.secondary", minWidth: 0 }}
              >
                <PersonOutlineRoundedIcon fontSize="small" sx={{ flexShrink: 0 }} />
                <Typography variant="body2">
                  PromptLab Creator
                </Typography>
              </Stack>

              <Chip
                icon={<ArticleOutlinedIcon />}
                label={`${userPosts.length} ${userPosts.length === 1 ? "post" : "posts"}`}
                size="small"
                sx={{
                  mt: 2,
                  bgcolor: "primary.50",
                  color: "primary.main",
                  fontWeight: 600,
                  "& .MuiChip-icon": { color: "primary.main" },
                }}
              />
            </Box>
          </Paper>

          <Divider sx={{ mb: { xs: 3, md: 4 } }} />

          {/* Posts Section */}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            }}
          >
            Prompts by {creatorUsername}
          </Typography>

          {loading ? (
            <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
              {[1, 2, 3, 4].map((n) => (
                <Grid key={n} size={{ xs: 12, sm: 6 }}>
                  <Skeleton
                    variant="rounded"
                    height={160}
                    sx={{ borderRadius: 3 }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : userPosts.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 3,
                border: "1px dashed #CBD5E1",
                color: "text.secondary",
              }}
            >
              <Typography variant="body1">
                This user hasn&apos;t posted anything yet.
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
              {userPosts.map((cont, index) => (
                <Grid key={cont.id ?? index} size={{ xs: 12, sm: 6 }}>
                  <PromptItem
                    model={cont.modelInfo}
                    creatorName={cont.authorUsername}
                    avatar={cont.attachmentUrl}
                    title={cont.title}
                    liked={cont.upvoteCount > 0}
                    likes={cont.upvoteCount}
                    description={cont.promptText}
                    createdAt={cont.createdAt}
                    onClick={() => {
                      dispatch(getPostById(cont.id)).then((v) => {
                        if (v.meta?.requestStatus === "fulfilled") {
                          setPostDet(true);
                        }
                      });
                    }}
                    onUpvote={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      dispatch(toggleUpvote(cont.id)).then((v) => {
                        if (v.meta?.requestStatus === "fulfilled") {
                          // FIX 2: Pass id as part of an object alongside page and size
                          dispatch(getPostsByUser({ id: id, page: 0, size: 10 })); 
                        }
                      });
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Box sx={{ display: { xs: "none", lg: "block" } }}>
          <RightSidebar />
        </Box>
      </Box>
    </>
  );
}

export default UserProfile;
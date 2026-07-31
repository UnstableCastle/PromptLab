import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPostById, toggleUpvote } from "../../redux/dashboard/dashboardThunk";
import { logoutUser } from "../../redux/auth/authThunk";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";
import PromptItem from "../../components/PromptItem";
import PostDetailsDialog from "../Home/PostDetailsDialogue";
import LogoutDialog from "../Home/LogoutDialog";
import { getPostsByUser } from "../../redux/profile/profileThunk";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myposts = useSelector((state) => state.profile?.viewedUserPosts || []);
  const post = useSelector((state) => state.dashboard?.post || {});
  const loading = useSelector((state) => state.loader?.loading || false);
  const { user } = useSelector((state) => state.auth);

  const [postDet, setPostDet] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(getPostsByUser({ id: user.id, page: 0, size: 10 }));
    }
  }, [dispatch, user?.id]);

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

          {/* Profile Header */}
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
              position: "relative",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              onClick={() => navigate("/edit-profile")}
              sx={{
                borderRadius: 5,
                px: 2.5,
                order: { xs: 3, sm: 0 },
                position: { sm: "absolute" },
                top: { sm: 24 },
                right: { sm: 24 },
              }}
            >
              Edit Profile
            </Button>

            <Avatar
              // Dynamically build the URL to your static uploads folder
              src={
                user?.profilePicture 
                  ? `${import.meta.env.VITE_BASE_URL.replace("/api", "")}/uploads/users/${user.id}/${user.profilePicture}` 
                  : undefined
              }
              alt={user?.username}
              sx={{
                width: { xs: 88, sm: 96, md: 112 },
                height: { xs: 88, sm: 96, md: 112 },
                fontSize: { xs: "2rem", md: "2.5rem" },
                bgcolor: "primary.main",
                flexShrink: 0,
              }}
            >
              {user?.username?.[0]?.toUpperCase()}
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
                {user?.username || user?.name}
              </Typography>

              <Stack
                direction="row"
                spacing={0.75}
                alignItems="center"
                justifyContent={{ xs: "center", sm: "flex-start" }}
                sx={{ mt: 0.75, color: "text.secondary", minWidth: 0 }}
              >
                <EmailOutlinedIcon fontSize="small" sx={{ flexShrink: 0 }} />
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user?.email || "No email on file"}
                </Typography>
              </Stack>

              {/* Bio Section */}
              {user?.bio && (
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1.5,
                    color: "text.primary",
                    maxWidth: { xs: "100%", sm: "80%" },
                    wordBreak: "break-word",
                  }}
                >
                  {user.bio}
                </Typography>
              )}

              <Chip
                icon={<ArticleOutlinedIcon />}
                label={`${myposts.length} ${myposts.length === 1 ? "post" : "posts"}`}
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

          {/* My Posts */}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            }}
          >
            My Posts
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
          ) : myposts.length === 0 ? (
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
                You haven&apos;t posted anything yet.
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
              {myposts.map((cont, index) => (
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
                          dispatch(getPostsByUser({ id: user.id, page: 0, size: 10 }));
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

export default Profile;
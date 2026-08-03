import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";
import PromptItem from "../../components/PromptItem";
import LogoutDialog from "../Home/LogoutDialog";
import PostDetailsDialog from "../Home/PostDetailsDialogue";

import { logoutUser } from "../../redux/auth/authThunk";
import { getPostById } from "../../redux/dashboard/dashboardThunk";
import { getAllUsers } from "../../redux/admin/adminThunk";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.loader.loading);
  const { user: authUser } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.admin?.users);
  // const users = useSelector((state) => state.admin?.users || []);
  const posts = useSelector((state) => state.dashboard?.posts || []);
  const post = useSelector((state) => state.dashboard.post);

  const [selectedTab, setSelectedTab] = useState("users");
  const [postDet, setPostDet] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Helper handler for profile redirection based on ownership
  const handleProfileRedirect = (targetUserId) => {
    if (!targetUserId) return;
    if (authUser?.id === targetUserId) {
      navigate("/profile");
    } else {
      navigate(`/user-profile/${targetUserId}`);
    }
  };

  return (
    <>

      <Box
        sx={{
          display: "flex",
          bgcolor: "#F8FAFC",
          minHeight: "calc(100vh - 64px)",
        }}
      >


        <Box
          component="main"
          sx={{
            flex: 1,
            p: 4,
          }}
        >

          <PostDetailsDialog
            open={postDet}
            onClose={() => setPostDet(false)}
            post={post}
          />

          {/* Header */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              mb: 4,
            }}
          >
            <Stack
              direction="row"
              spacing={3}
              style={{ alignItems: "center" }}
            >
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  bgcolor: "#4F46E5",
                }}
              >
                <AdminPanelSettingsOutlinedIcon fontSize="large" />
              </Avatar>

              <Box>
                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  Admin Dashboard
                </Typography>

                <Typography color="text.secondary">
                  Manage users and posts
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Statistics */}
          <Grid
            container
            spacing={3}
            mb={4}
          >
            <Grid
              xs={12}
              md={6}
            >
              <Paper
                onClick={() => setSelectedTab("users")}
                sx={{
                  p: 3,
                  cursor: "pointer",
                  borderRadius: 3,
                  bgcolor:
                    selectedTab === "users"
                      ? "#EEF2FF"
                      : "#fff",
                  transition: ".2s",

                  "&:hover": {
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <GroupOutlinedIcon
                  color="primary"
                  fontSize="large"
                />

                <Typography mt={1}>
                  Total Users
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight={700}
                >
                  {users && users.length}
                </Typography>
              </Paper>
            </Grid>

            <Grid

              xs={12}
              md={6}
            >
              <Paper
                onClick={() => setSelectedTab("posts")}
                sx={{
                  p: 3,
                  cursor: "pointer",
                  borderRadius: 3,
                  bgcolor:
                    selectedTab === "posts"
                      ? "#EEF2FF"
                      : "#fff",
                  transition: ".2s",

                  "&:hover": {
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <ArticleOutlinedIcon
                  color="success"
                  fontSize="large"
                />

                <Typography mt={1}>
                  Total Posts
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight={700}
                >
                  {posts.length}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 4 }} />

          <Typography
            variant="h5"
            fontWeight={700}
            mb={3}
          >
            {selectedTab === "users"
              ? "All Users"
              : "All Posts"}
          </Typography>

          {loading ? (
            <Grid
              container
              spacing={3}
            >
              {[1, 2, 3, 4].map((n) => (
                <Grid

                  xs={12}
                  md={6}
                  key={n}
                >
                  <Skeleton
                    variant="rounded"
                    height={180}
                  />
                </Grid>
              ))}
            </Grid>
          ) : selectedTab === "users" ? (
            <Grid
              container
              spacing={3}
            >
              {users && users.map((user) => (
                <Grid key={user.id}
                  xs={12}
                  md={6}

                >
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 3,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >
                      <Avatar src={user.attachmentUrl}>
                        {user.username?.charAt(0)}
                      </Avatar>

                      <Box
                        sx={{
                          flex: 1,
                          cursor: "pointer",
                        }}
                        onClick={() => handleProfileRedirect(user.id)}
                      >
                        <Typography fontWeight={700}>
                          {user.username}
                        </Typography>

                        <Typography
                          color="text.secondary"
                          variant="body2"
                        >
                          {user.email}
                        </Typography>
                      </Box>

                      <Button
                        variant="outlined"
                        color="error"
                      >
                        Suspend
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid
              container
              spacing={3}
            >
              {posts.map((item) => (
                <Grid

                  xs={12}
                  md={6}
                  key={item.id}
                >
                  <Box>
                    <PromptItem
                      model={item.modelInfo}
                      creatorName={item.authorUsername}
                      avatar={item.attachmentUrl}
                      title={item.title}
                      description={item.promptText}
                      likes={item.upvoteCount}
                      liked={false}
                      createdAt={item.createdAt}
                      onClick={() => {
                        dispatch(getPostById(item.id)).then(() => {
                          setPostDet(true);
                        });
                      }}
                    />

                    <Button
                      fullWidth
                      color="error"
                      variant="contained"
                      sx={{ mt: 1 }}
                    >
                      Delete Post
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Box
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
        >
          <RightSidebar />
        </Box>
      </Box>
    </>
  );
}

export default AdminDashboard;
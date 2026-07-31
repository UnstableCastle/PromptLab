import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";
import PromptItem from "../../components/PromptItem";
import PostDetailsDialog from "../Home/PostDetailsDialogue";
import LogoutDialog from "../Home/LogoutDialog";

// Thunks
import { getPostById, toggleUpvote } from "../../redux/dashboard/dashboardThunk";
import { getPostsByUser, getUserProfile, followUser, unfollowUser } from "../../redux/profile/profileThunk";
import { logoutUser } from "../../redux/auth/authThunk";

function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 

  const post = useSelector((state) => state.dashboard?.post || {});
  const loading = useSelector((state) => state.loader?.loading || false);
  const userPosts = useSelector((state) => state.profile?.viewedUserPosts || []);
  const viewedUser = useSelector((state) => state.profile?.viewedUser);
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const [postDet, setPostDet] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const currentUserId = loggedInUser?.id?.toString();
  const profileId = id?.toString();
  const isOwnProfile = currentUserId && profileId && currentUserId === profileId;

  useEffect(() => {
    if (id && id !== "undefined") {
      dispatch(getPostsByUser({ id: id, page: 0, size: 10 }));
      dispatch(getUserProfile(id)); 
    }
  }, [dispatch, id]);

  const routerState = location.state || {};
  const firstPost = userPosts?.length > 0 ? userPosts[0] : {};
  
  const creatorUsername = routerState.username || viewedUser?.username || firstPost.authorUsername || firstPost.username || "PromptLab Creator";
  
  // FIXED: Applied correct backend URL construction to prevent broken/blank image links
  const baseUrl = import.meta.env.VITE_BASE_URL ? import.meta.env.VITE_BASE_URL.replace("/api", "") : "";
  const creatorAvatar = viewedUser?.profilePicture 
      ? `${baseUrl}${viewedUser.profilePicture}` 
      : (routerState.avatar || firstPost.attachmentUrl || firstPost.avatar || "");

  // FIXED: Changed `followerCount` to `followersCount` to accurately map to DTO fix
  const isFollowing = viewedUser?.followedByCurrentUser || false;
  const followersCount = viewedUser?.followersCount || 0;
  const followingCount = viewedUser?.followingCount || 0;

  const handleFollowAction = () => {
    if (isFollowing) {
      dispatch(unfollowUser(id));
    } else {
      dispatch(followUser(id));
    }
    handleMenuClose();
  };

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

        <Box component="main" sx={{ flex: 1, minWidth: 0, width: "100%", p: { xs: 2, sm: 3, md: 4 } }}>
          <PostDetailsDialog open={postDet} onClose={() => setPostDet(false)} post={post} />

          <LogoutDialog
            open={openLogout}
            onClose={() => setOpenLogout(false)}
            onLogout={() => {
              dispatch(logoutUser()).then((v) => {
                if (v.meta?.requestStatus === "fulfilled") navigate("/", { replace: true });
              });
            }}
          />

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3, md: 4 },
              mb: { xs: 3, md: 4 },
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: { xs: "center", sm: "left" },
              gap: { xs: 2, sm: 3 },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: "column", sm: "row" }, gap: 3, alignItems: "center", width: "100%", minWidth: 0 }}>
              <Avatar
                src={creatorAvatar}
                sx={{ width: { xs: 88, sm: 96, md: 112 }, height: { xs: 88, sm: 96, md: 112 }, fontSize: { xs: "2rem", md: "2.5rem" }, bgcolor: "primary.main", flexShrink: 0 }}
              >
                {creatorUsername?.charAt(0)?.toUpperCase()}
              </Avatar>

              <Box sx={{ minWidth: 0, width: "100%" }}>
                <Typography variant="h5" fontWeight="bold" noWrap sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" } }}>
                  {creatorUsername}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: "center", justifyContent: { xs: "center", sm: "flex-start" }, mt: 0.75, color: "text.secondary", minWidth: 0 }}>
                  <PersonOutlineRoundedIcon fontSize="small" sx={{ flexShrink: 0 }} />
                  <Typography variant="body2">PromptLab Creator</Typography>
                </Box>
                
                {/* FIXED: Brought the bio field into the public profile page */}
                {viewedUser?.bio && (
                  <Typography variant="body1" sx={{ mt: 1.5, color: "text.primary", maxWidth: { xs: "100%", sm: "80%" }, wordBreak: "break-word" }}>
                    {viewedUser.bio}
                  </Typography>
                )}

                <Box sx={{ display: "flex", gap: 2, mt: 1.5, justifyContent: { xs: "center", sm: "flex-start" } }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>{followersCount}</strong> Followers
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>{followingCount}</strong> Following
                  </Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Chip
                    icon={<ArticleOutlinedIcon />}
                    label={`${userPosts.length} ${userPosts.length === 1 ? "post" : "posts"}`}
                    size="small"
                    sx={{ bgcolor: "primary.50", color: "primary.main", fontWeight: 600, "& .MuiChip-icon": { color: "primary.main" } }}
                  />
                </Box>
              </Box>
            </Box>

            {!isOwnProfile && (
              <Box sx={{ flexShrink: 0, alignSelf: { xs: "center", sm: "flex-start" } }}>
                {isFollowing ? (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<CheckIcon />}
                      endIcon={<KeyboardArrowDownIcon />}
                      onClick={handleMenuClick}
                      sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600, px: 3 }}
                    >
                      Following
                    </Button>
                    <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }}>
                      <MenuItem onClick={handleFollowAction}>
                        <ListItemIcon><PersonRemoveIcon fontSize="small" color="error" /></ListItemIcon>
                        <Typography color="error" variant="body2">Unfollow</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button variant="contained" color="primary" startIcon={<PersonAddAlt1Icon />} onClick={handleFollowAction} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600, px: 3 }}>
                    Follow
                  </Button>
                )}
              </Box>
            )}
          </Paper>

          <Divider sx={{ mb: { xs: 3, md: 4 } }} />

          <Typography variant="h5" fontWeight="bold" sx={{ mb: { xs: 2, md: 3 }, fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" } }}>
            Prompts by {creatorUsername}
          </Typography>

          {loading ? (
            <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
              {[1, 2, 3, 4].map((n) => (
                <Grid key={n} xs={12} sm={6}>
                  <Skeleton variant="rounded" height={160} sx={{ borderRadius: 3 }} />
                </Grid>
              ))}
            </Grid>
          ) : userPosts.length === 0 ? (
            <Paper elevation={0} sx={{ p: 4, textAlign: "center", borderRadius: 3, border: "1px dashed #CBD5E1", color: "text.secondary" }}>
              <Typography variant="body1">This user hasn&apos;t posted anything yet.</Typography>
            </Paper>
          ) : (
            <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
              {userPosts.map((cont, index) => (
                <Grid key={cont.id ?? index} xs={12} sm={6}>
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
                        if (v.meta?.requestStatus === "fulfilled") setPostDet(true);
                      });
                    }}
                    onUpvote={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      dispatch(toggleUpvote(cont.id)).then((v) => {
                        if (v.meta?.requestStatus === "fulfilled") {
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
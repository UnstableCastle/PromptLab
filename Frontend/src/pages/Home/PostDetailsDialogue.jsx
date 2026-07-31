import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleUpvote } from "../../redux/dashboard/dashboardThunk";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

const PRIMARY = "#4f46e5";
const BACKEND_URL = "http://localhost:8081";

const PostDetailsDialog = ({
  open,
  onClose,
  post = {},
  liked = false,
  onLike,
}) => {
  const [copied, setCopied] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Grab the currently logged-in user to check ownership condition
  const { user: authUser } = useSelector((state) => state.auth);

  const handleCopy = async () => {
    if (!post?.promptText) return;

    try {
      await navigator.clipboard.writeText(post.promptText);
      setCopied(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpvoteClick = () => {
    if (post?.id) {
      dispatch(toggleUpvote(post.id));
    }

    if (onLike) {
      onLike();
    }
  };

  // Handler to redirect to the correct profile page based on ownership
  const handleProfileClick = () => {
    const authorId = post?.userId || post?.authorId;
    if (!authorId) return;

    if (authUser?.id === authorId) {
      navigate("/profile");
    } else {
      navigate(`/user-profile/${authorId}`);
    }
    
    // Close the dialog so it isn't open when the new page loads
    onClose(); 
  };

  const formattedDate = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 5,
            overflow: "hidden",
            border: `1px solid ${alpha(PRIMARY, 0.12)}`,
            background: `linear-gradient(
              180deg,
              ${alpha(PRIMARY, 0.08)} 0%,
              ${alpha(PRIMARY, 0.03)} 18%,
              #fff 45%
            )`,
          },
        }}
      >
        <DialogTitle
          sx={{
            px: 3,
            py: 2.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={700} sx={{ color: "#312e81" }}>
              {post?.title || "Prompt Details"}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Explore, copy and use this prompt.
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              bgcolor: alpha(PRIMARY, 0.08),
              "&:hover": { bgcolor: alpha(PRIMARY, 0.15) },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ p: 3 }}>
          {(post?.modelInfo || post?.category) && (
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" mb={3}>
              {post?.modelInfo && (
                <Chip
                  label={post.modelInfo}
                  sx={{
                    bgcolor: alpha(PRIMARY, 0.12),
                    color: PRIMARY,
                    fontWeight: 700,
                    borderRadius: 2,
                  }}
                />
              )}
              {post?.category && (
                <Chip
                  label={post.category}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    borderColor: alpha(PRIMARY, 0.25),
                  }}
                />
              )}
            </Stack>
          )}

          <Typography variant="subtitle1" fontWeight={700} mb={1.5} color="#312e81">
            Prompt
          </Typography>
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              border: `1px solid ${alpha(PRIMARY, 0.12)}`,
              bgcolor: alpha(PRIMARY, 0.03),
              fontFamily: "monospace",
              fontSize: 15,
              lineHeight: 1.9,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              maxHeight: 350,
              overflowY: "auto",
              "&::-webkit-scrollbar": { width: 8 },
              "&::-webkit-scrollbar-thumb": {
                background: alpha(PRIMARY, 0.25),
                borderRadius: 10,
              },
            }}
          >
            {post?.promptText}
          </Box>

          {post?.attachmentUrl && (
            <Box mt={3} display="flex" flexDirection="column" gap={2}>
              <Box
                component="img"
                src={`${BACKEND_URL}${post.attachmentUrl}`}
                alt="Post Attachment"
                sx={{
                  width: "100%",
                  maxHeight: 300,
                  objectFit: "contain",
                  borderRadius: 3,
                  border: `1px solid ${alpha(PRIMARY, 0.12)}`,
                  bgcolor: alpha(PRIMARY, 0.02),
                }}
              />
              <Box>
                <Button
                  component="a"
                  href={`${BACKEND_URL}${post.attachmentUrl}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<DownloadRoundedIcon />}
                  sx={{
                    borderRadius: 3,
                    px: 2.5,
                    textTransform: "none",
                    fontWeight: 700,
                    color: PRIMARY,
                    borderColor: alpha(PRIMARY, 0.3),
                    "&:hover": {
                      borderColor: PRIMARY,
                      bgcolor: alpha(PRIMARY, 0.05),
                    },
                  }}
                >
                  Download Attachment
                </Button>
              </Box>
            </Box>
          )}

          <Box
            sx={{
              mt: 4,
              p: 2,
              borderRadius: 3,
              bgcolor: alpha(PRIMARY, 0.04),
              border: `1px solid ${alpha(PRIMARY, 0.08)}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Stack 
              direction="row" 
              spacing={2} 
              alignItems="center"
              onClick={handleProfileClick}
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
                transition: "opacity 0.2s"
              }}
            >
              <Avatar
                src={post?.avatar}
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: PRIMARY,
                  fontWeight: 700,
                }}
              >
                {!post?.avatar && post?.authorUsername?.charAt(0)}
              </Avatar>
              <Box>
                <Typography 
                  fontWeight={700} 
                  fontSize={16}
                  sx={{ "&:hover": { textDecoration: "underline" } }}
                >
                  {post?.authorUsername}
                </Typography>
                <Stack direction="row" spacing={2} mt={0.5} flexWrap="wrap">
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PersonRoundedIcon sx={{ fontSize: 15, color: PRIMARY }} />
                    <Typography variant="caption" color="text.secondary">
                      Creator
                    </Typography>
                  </Stack>
                  {formattedDate && (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <CalendarTodayRoundedIcon sx={{ fontSize: 14, color: PRIMARY }} />
                      <Typography variant="caption" color="text.secondary">
                        {formattedDate}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Box>
            </Stack>

            <Button
              variant={liked ? "contained" : "outlined"}
              startIcon={liked ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
              onClick={handleUpvoteClick}
              sx={{
                borderRadius: 3,
                px: 2.5,
                minWidth: 120,
                fontWeight: 700,
                textTransform: "none",
                ...(liked
                  ? {
                      bgcolor: PRIMARY,
                      "&:hover": { bgcolor: "#4338ca" },
                    }
                  : {
                      color: PRIMARY,
                      borderColor: alpha(PRIMARY, 0.35),
                      "&:hover": {
                        borderColor: PRIMARY,
                        bgcolor: alpha(PRIMARY, 0.05),
                      },
                    }),
              }}
            >
              {post?.upvoteCount ?? 0}
            </Button>
          </Box>
        </DialogContent>

        <Divider />

        <DialogActions
          sx={{ p: 3, justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}
        >
          <Tooltip title="Copy Prompt">
            <Button
              variant="outlined"
              startIcon={<ContentCopyRoundedIcon />}
              onClick={handleCopy}
              sx={{
                borderRadius: 3,
                px: 2.5,
                textTransform: "none",
                fontWeight: 700,
                color: PRIMARY,
                borderColor: alpha(PRIMARY, 0.3),
                "&:hover": {
                  borderColor: PRIMARY,
                  bgcolor: alpha(PRIMARY, 0.05),
                },
              }}
            >
              Copy Prompt
            </Button>
          </Tooltip>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              px: 4,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              bgcolor: PRIMARY,
              "&:hover": { bgcolor: "#4338ca" },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message={
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircleRoundedIcon fontSize="small" />
            <Typography variant="body2">Prompt copied successfully</Typography>
          </Stack>
        }
      />
    </>
  );
};

export default PostDetailsDialog;
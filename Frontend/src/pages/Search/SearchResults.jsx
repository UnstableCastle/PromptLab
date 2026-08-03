import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  CardActionArea,
  Stack,
  Chip,
  alpha,
  Divider
} from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Icons
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import PostDetailsDialog from "../Home/PostDetailsDialogue";
import { searchThunk, clearSearchResults } from "../../redux/search/searchSlice";

const PRIMARY = "#4f46e5";
const BACKEND_URL = "http://localhost:8081";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { results, status, error } = useSelector((state) => state.search);

  const [selectedPost, setSelectedPost] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    console.log(searchParams,"s=s=s=s=s=")
    if (keyword) {
      dispatch(searchThunk(keyword));
    }

    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch, keyword]);

  const handleCardClick = (post) => {
    setSelectedPost(post);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPost(null);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)", bgcolor: "#F8FAFC" }}>
        <Sidebar mobile={false} />

        <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 } }}>

          {/* Header Section */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AutoAwesomeRoundedIcon sx={{ color: PRIMARY, fontSize: 32 }} />
            <Typography variant="h4" fontWeight="500" sx={{ color: "#000000" }}>
              Search Results for "{keyword}"
            </Typography>
          </Box>

          {/* Loading State */}
          {status === "loading" && (
            <Stack alignItems="center" justifyContent="center" sx={{ mt: 10, py: 5 }}>
              <CircularProgress sx={{ color: PRIMARY, mb: 2 }} />
              <Typography variant="body1" color="text.secondary" fontWeight="500">
                Searching PromptLab...
              </Typography>
            </Stack>
          )}

          {/* Error State */}
          {status === "failed" && (
            <Box sx={{ p: 3, bgcolor: alpha('#ef4444', 0.1), borderRadius: 3, border: '1px solid #ef4444' }}>
              <Typography variant="body1" color="error" fontWeight="600">
                {error}
              </Typography>
            </Box>
          )}

          {/* Results Grid */}
          {status === "succeeded" && results?.length > 0 && (
            <Grid container spacing={3}>
              {results.map((post) => (
                <Grid item xs={12} md={6} key={post.id}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      border: `1px solid ${alpha(PRIMARY, 0.15)}`,
                      boxShadow: 'none',
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.2s ease-in-out",
                      bgcolor: alpha(PRIMARY, 0.02), // Light purple/grey background match
                      "&:hover": {
                        borderColor: PRIMARY,
                        boxShadow: `0 0 0 1px ${PRIMARY}, 0 4px 20px ${alpha(PRIMARY, 0.1)}`,
                        transform: "translateY(-2px)"
                      }
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleCardClick(post)}
                      sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                    >
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        
                        {/* Top Chip */}
                        {(post.modelInfo || post.category) && (
                          <Chip
                            label={post.modelInfo || post.category}
                            size="small"
                            sx={{
                              bgcolor: alpha(PRIMARY, 0.15),
                              color: PRIMARY,
                              fontWeight: 600,
                              borderRadius: '12px',
                              mb: 2,
                              fontSize: '0.75rem',
                              height: 24
                            }}
                          />
                        )}

                        {/* Title */}
                        <Typography variant="h6" sx={{ color: "#1e1b4b", fontWeight: 400, mb: 1.5 }}>
                          {post.title || "Untitled Draft"}
                        </Typography>
                        
                        {/* Description */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#475569",
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                            lineHeight: 1.6
                          }}
                        >
                          {post.promptText || post.content || post.description || "Draft content..."}
                        </Typography>
                      </CardContent>

                      {/* Divider */}
                      <Box sx={{ px: 3 }}>
                        <Divider sx={{ borderColor: alpha(PRIMARY, 0.08) }} />
                      </Box>

                      {/* Card Footer */}
                      <Box sx={{ p: 3, pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        
                        {/* User Info & Date */}
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar
                            src={post.user?.avatarUrl ? `${BACKEND_URL}${post.user.avatarUrl}` : post.avatar}
                            sx={{ bgcolor: PRIMARY, fontWeight: 600, width: 42, height: 42 }}
                          >
                            {!post.user?.avatarUrl && !post.avatar && (post.user?.username || post.authorUsername || "A").charAt(0).toUpperCase()}
                          </Avatar>
                          <Stack spacing={0.2}>
                            <Typography variant="subtitle2" sx={{ color: "#1e1b4b", fontWeight: 500, fontSize: '0.875rem' }}>
                              {post.user?.username || post.user?.name || post.authorUsername || "Anonymous"}
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "text.secondary" }}>
                              <CalendarTodayOutlinedIcon sx={{ fontSize: '0.75rem' }} />
                              <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                                {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : ""}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>

                        {/* Upvote Box */}
                        <Chip
                          icon={<ThumbUpAltOutlinedIcon sx={{ fontSize: '1.1rem !important', color: `${PRIMARY} !important` }} />}
                          label={post.upvoteCount || 0}
                          sx={{
                            bgcolor: alpha(PRIMARY, 0.1),
                            color: PRIMARY,
                            fontWeight: 600,
                            borderRadius: '8px', 
                            height: 32,
                            '& .MuiChip-label': { px: 1 }
                          }}
                        />
                      </Box>

                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Empty State */}
          {status === "succeeded" && results?.length === 0 && (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                mt: 6,
                py: 8,
                px: 2,
                borderRadius: 4,
                border: `2px dashed ${alpha(PRIMARY, 0.2)}`,
                bgcolor: alpha(PRIMARY, 0.02)
              }}
            >
              <SearchOffRoundedIcon sx={{ fontSize: 64, color: alpha(PRIMARY, 0.4), mb: 2 }} />
              <Typography variant="h6" fontWeight="700" color="#312e81" gutterBottom>
                No prompts found
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center" maxWidth={400}>
                We couldn't find anything matching "{keyword}". Try adjusting your search terms or exploring different categories.
              </Typography>
            </Stack>
          )}
        </Box>
      </Box>

      {/* Render the PostDetailsDialog when a card is clicked */}
      <PostDetailsDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        post={selectedPost}
      />
    </>
  );
}

export default SearchResults;
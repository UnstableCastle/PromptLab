import React, { useMemo } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Typography,
  Button,
} from "@mui/material";

function RightSidebar({ posts = [] }) {
  
  const modelTrends = useMemo(() => {
    // Adding a log here so you can inspect the exact data structure in your browser console
    console.log("Data passed to RightSidebar:", posts);

    if (!posts || posts.length === 0) return [];

    const modelCounts = {};
    let totalModelsUsed = 0;

    posts.forEach((post) => {
      let extractedModelName = null;

      if (post.modelInfo) {
        // 1. If it's just a simple string (e.g., "GPT-4")
        if (typeof post.modelInfo === "string") {
          extractedModelName = post.modelInfo;
        } 
        // 2. If it's a nested object (e.g., { id: 1, name: "GPT-4" })
        else if (typeof post.modelInfo === "object") {
          // Try all common key names
          extractedModelName = 
            post.modelInfo.name || 
            post.modelInfo.modelName || 
            post.modelInfo.title || 
            post.modelInfo.model || 
            post.modelInfo.value || 
            post.modelInfo.label;
            
          // 3. ULTIMATE FALLBACK: If we still don't have it, find the first property that is a string
          if (!extractedModelName) {
            extractedModelName = Object.values(post.modelInfo).find(
              (val) => typeof val === "string"
            );
          }
        }
      }

      // If we successfully found a name, count it
      if (extractedModelName) {
        modelCounts[extractedModelName] = (modelCounts[extractedModelName] || 0) + 1;
        totalModelsUsed++;
      }
    });

    if (totalModelsUsed === 0) return [];

    return Object.keys(modelCounts)
      .map((name) => ({
        name,
        value: Math.round((modelCounts[name] / totalModelsUsed) * 100),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);
  }, [posts]);

  const tags = [
    "React",
    "AI",
    "Coding",
    "Marketing",
    "Java",
    "ChatGPT",
    "Prompt Engineering",
  ];

  const creators = [
    { name: "@dev_ninja", avatar: "https://i.pravatar.cc/150?img=5" },
    { name: "@alex", avatar: "https://i.pravatar.cc/150?img=8" },
    { name: "@sarah", avatar: "https://i.pravatar.cc/150?img=10" },
  ];

  return (
    <Box sx={{ width: 320, p: 3, display: { xs: "none", lg: "block" } }}>
      {/* Model Trends */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Model Trends
          </Typography>

          {modelTrends.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Not enough data yet.
            </Typography>
          ) : (
            modelTrends.map((item) => (
              <Box key={item.name} mb={2}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>{item.name}</Typography>
                  <Typography>{item.value}%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={item.value}
                  sx={{ mt: 1, borderRadius: 5 }}
                />
              </Box>
            ))
          )}
        </CardContent>
      </Card>

      {/* Trending Tags */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Trending Tags
          </Typography>
          <Box display="flex" sx={{ flexWrap: "wrap" }} gap={1}>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Top Creators */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Top Creators
          </Typography>
          {creators.map((creator) => (
            <Box key={creator.name}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} py={1}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar src={creator.avatar} />
                  <Typography>{creator.name}</Typography>
                </Box>
                <Button size="small" variant="contained">
                  Follow
                </Button>
              </Box>
              <Divider />
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}

export default RightSidebar;
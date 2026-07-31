import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Chip,
  IconButton,
  Stack,
  Typography,
  alpha,
} from "@mui/material";

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

const PromptItem = ({
  title,
  description,
  model,
  category,
  creatorName,
  avatar,
  likes = 0,
  liked = false,
  createdAt,
  onUpvote, 
  onClick,
}) => {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid",
        borderColor: alpha("#4f46e5", 0.15),
        background: `linear-gradient(
          180deg,
          ${alpha("#4f46e5", 0.08)} 0%,
          ${alpha("#4f46e5", 0.02)} 30%,
          #fff 100%
        )`,
        transition: "all .3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 14px 35px ${alpha("#4f46e5", 0.22)}`,
          borderColor: "#4f46e5",
        },
      }}
    >
      {/* THE FIX: Wrapping ONLY the body in CardActionArea for the modal click */}
      <CardActionArea
        onClick={onClick}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
          p: { xs: 2, sm: 2.5, md: 3 },
          pb: 0,
        }}
      >
        {/* Header Chips */}
        {(model || category) && (
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: "wrap", mb: 2 }} 
          >
            {model && (
               <Chip
                label={model}
                size="small"
                sx={{
                  bgcolor: alpha("#4f46e5", 0.1),
                  color: "#4f46e5",
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              />
            )}

            {category && (
               <Chip
                label={category}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  borderColor: alpha("#4f46e5", 0.25),
                  color: "#555",
                }}
              />
            )}
          </Stack>
        )}

        {/* Content */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              mb: 1.5,
              color: "#1e1b4b",
              lineHeight: 1.35,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.8,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </Typography>
        </Box>
      </CardActionArea>

      {/* THE FIX: Footer is completely separate. Clicking here won't open the modal! */}
      <Box
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          pt: 2,
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Divider */}
        <Box
          sx={{
            mb: 2,
            borderBottom: "1px solid",
            borderColor: alpha("#4f46e5", 0.12),
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Left */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ alignItems: "center", minWidth: 0 }} 
          >
             <Avatar
              src={avatar}
              sx={{
                width: 42,
                height: 42,
                bgcolor: "#4f46e5",
                fontWeight: 700,
              }}
            >
              {!avatar && creatorName?.charAt(0)}
            </Avatar>

            <Box sx={{ minWidth: 0 }}> 
               <Typography
                variant="body2"
                fontWeight={700}
                noWrap
              >
                {creatorName}
              </Typography>

              {formattedDate && (
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{ alignItems: "center" }} 
                >
                   <CalendarTodayOutlinedIcon
                    sx={{
                      fontSize: 12,
                      color: "text.secondary",
                    }}
                  />

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                  >
                    {formattedDate}
                  </Typography>
                </Stack>
              )}
            </Box>
          </Stack>

          {/* Right */}
          <IconButton
            onClick={onUpvote}
            sx={{
              borderRadius: 3,
              px: 1.2,
              py: 0.7,
              bgcolor: liked
                ? alpha("#4f46e5", 0.12)
                : alpha("#4f46e5", 0.05),
              "&:hover": {
                bgcolor: alpha("#4f46e5", 0.18),
              },
            }}
          >
             <Stack
              direction="row"
              spacing={0.5}
              sx={{ alignItems: "center" }} 
            >
               {liked ? (
                 <ThumbUpAltIcon
                  fontSize="small"
                  sx={{ color: "#4f46e5" }}
                />
              ) : (
                 <ThumbUpAltOutlinedIcon
                  fontSize="small"
                  sx={{ color: "#4f46e5" }}
                />
              )}

              <Typography
                variant="body2"
                fontWeight={700}
                color="#4f46e5"
              >
                {likes}
              </Typography>
            </Stack>
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default PromptItem;
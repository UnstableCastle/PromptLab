import { Box, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import logo_filled from "../assets/images/logo_filled.png";
import bg_left from "../assets/images/bg-auth.png";

const FEATURES = [
  "Build, test and refine prompts faster",
  "Discover trending prompts from the community",
  "Track performance across every model",
];

export default function AuthPageLayout({
  children,
  title,
  subtitle,
  leftTitle = "Join the future of Prompt Engineering",
}) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Side - hidden on mobile/tablet */}
      <Box
        sx={{
          position: "relative",
          display: { xs: "none", md: "flex" },
          width: { md: "50%" },
          bgcolor: "#4f46e5",
          backgroundImage: `url(${bg_left})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Contrast overlay so text stays legible over any part of the
            background image, regardless of its own colors/brightness. */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(49,38,180,0.92) 0%, rgba(79,70,229,0.86) 45%, rgba(30,23,120,0.94) 100%)",
          }}
        />

        {/* Decorative soft glow accents for extra depth */}
        <Box
          sx={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            top: -120,
            right: -120,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            bottom: -100,
            left: -100,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)",
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            px: { md: 6, lg: 8 },
            py: 8,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 2.5,
                bgcolor: "rgba(255,255,255,0.14)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1.5,
                backdropFilter: "blur(4px)",
              }}
            >
              <img
                src={logo_filled}
                alt="Logo"
                style={{ width: 32, height: 32, display: "block" }}
              />
            </Box>

            <Typography
              variant="h5"
              sx={{
                color: "#fff",
                fontWeight: 700,
                letterSpacing: 0.2,
              }}
            >
              PromptLabAI
            </Typography>
          </Box>

          <Box sx={{ maxWidth: 440 }}>
            <Typography
              variant="h3"
              sx={{
                color: "#fff",
                fontWeight: 700,
                lineHeight: 1.25,
                fontSize: { md: "2rem", lg: "2.5rem" },
                mb: 4,
              }}
            >
              {leftTitle}
            </Typography>

            <Stack spacing={1.75}>
              {FEATURES.map((feature) => (
                <Stack
                  key={feature}
                  direction="row"
                  sx={{
                    alignItems: "center",
                  }}
                  spacing={1.25}
                >
                  <CheckCircleRoundedIcon
                    sx={{ color: "rgba(255,255,255,0.85)", fontSize: 20 }}
                  />
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: { md: "0.95rem", lg: "1rem" },
                    }}
                  >
                    {feature}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* Spacer to balance the flex justify-content: space-between */}
          <Box />
        </Box>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          bgcolor: "#fcf8ff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, sm: 5 },
          py: { xs: 6, md: 4 },
        }}
      >
        {/* Constrained, centered form column - keeps inputs from stretching
            edge-to-edge on large monitors where this panel is very wide. */}
        <Box sx={{ width: "100%", maxWidth: 440 }}>
          {/* Logo shown here instead, only on mobile */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              mb: 4,
            }}
          >
            <img
              src={logo_filled}
              alt="Logo"
              style={{ width: 44, height: 44, marginRight: 10 }}
            />
            <Typography variant="h5" sx={{ color: "#4f46e5", fontWeight: 700 }}>
              PromptLabAI
            </Typography>
          </Box>

          <Box sx={{ mb: { xs: 3, md: 5 } }}>
            <Typography
              variant="h4"
              sx={{
                color: "#3525cd",
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" },
                lineHeight: 1.3,
              }}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                sx={{
                  mt: 1,
                  color: "#666",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          {children}
        </Box>
      </Box>
    </Box>
  );
}

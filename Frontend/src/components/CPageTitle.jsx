import { Typography } from "@mui/material";

export default function CPageTitle({ title, subtitle }) {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          color: "#3525cd",
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          mb: 4,
          color: "#666",
        }}
      >
        {subtitle}
      </Typography>
    </>
  );
}
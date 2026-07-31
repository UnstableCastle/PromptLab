import { Button } from "@mui/material";

export default function CButton({
  children,
  onClick,
  type = "button",
  fullWidth = true,
  disabled = false,
}) {
  
  return (
    <Button
      type={type}
      onClick={onClick}
      
      fullWidth={fullWidth}
      disabled={disabled}
      variant="contained"
      sx={{
        bgcolor: "#4f46e5",
        py: 1.6,
        borderRadius: 3,
        fontSize: 16,
        textTransform: "none",
        fontWeight: 600,

        "&:hover": {
          bgcolor: "#4338ca",
        },
      }}
    >
      {children}
    </Button>
  );
}
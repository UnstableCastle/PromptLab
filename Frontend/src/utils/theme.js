import { createTheme } from "@mui/material/styles";

export const colors = {
  primary: "#4f46e5",
  primaryLight: "#6366f1",
  primaryDark: "#4338ca",
  primaryGlow: "rgba(79, 70, 229, 0.35)",

  accent: "#a78bfa", // secondary accent, used sparingly (gradients, highlights)

  background: "#0b0b12", // app shell background
  surface: "#141420", // cards, inputs, panels
  surfaceRaised: "#191927", // hover/elevated surfaces
  border: "#26263a",
  borderActive: "#4f46e5",

  text: "#f2f2f7",
  textMuted: "#8f8fa3",
  textMutedSoft: "#5c5c72",

  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.primary,
      light: colors.primaryLight,
      dark: colors.primaryDark,
      contrastText: "#ffffff",
    },
    secondary: {
      main: colors.accent,
      contrastText: "#0b0b12",
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.text,
      secondary: colors.textMuted,
      disabled: colors.textMutedSoft,
    },
    divider: colors.border,
    success: { main: colors.success },
    warning: { main: colors.warning },
    error: { main: colors.error },
  },

  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h1: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h5: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    body1: { fontSize: 14, lineHeight: 1.6 },
    body2: { fontSize: 13, lineHeight: 1.6, color: colors.textMuted },
    button: { textTransform: "none", fontWeight: 600 },
    caption: {
      fontSize: 11,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: colors.textMutedSoft,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `radial-gradient(1200px 600px at 15% -10%, ${colors.primaryGlow}, transparent 60%), ${colors.background}`,
          minHeight: "100vh",
        },
        "::selection": {
          background: colors.primary,
          color: "#fff",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // kill MUI's default dark-mode elevation overlay
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 20px",
        },
        contained: {
          boxShadow: `0 8px 24px -8px ${colors.primaryGlow}`,
          "&:hover": {
            boxShadow: `0 10px 28px -6px ${colors.primaryGlow}`,
          },
          "&.Mui-disabled": {
            backgroundColor: colors.surfaceRaised,
            color: colors.textMutedSoft,
          },
        },
        outlined: {
          borderColor: colors.border,
          "&:hover": {
            borderColor: colors.primary,
            backgroundColor: "rgba(79,70,229,0.08)",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: colors.surface,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.border,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.primaryLight,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.primary,
            borderWidth: 1.5,
          },
        },
        input: {
          color: colors.text,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.textMuted,
          "&.Mui-focused": {
            color: colors.primaryLight,
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 500,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colors.textMuted,
          "&:hover": {
            color: colors.text,
            backgroundColor: "rgba(255,255,255,0.06)",
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.border,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surface,
          backgroundImage: "none",
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: "none",
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colors.surfaceRaised,
          border: `1px solid ${colors.border}`,
          fontSize: 12,
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          backgroundColor: colors.surfaceRaised,
        },
        bar: {
          borderRadius: 999,
        },
      },
    },
  },
});

export default theme;

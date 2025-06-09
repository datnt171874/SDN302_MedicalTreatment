import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5D7B6F", // Dark Green - Primary actions and highlights, from user's palette
    },
    secondary: {
      main: "#A4C3A2", // Muted Green - Secondary elements, from user's palette
    },
    background: {
      default: "#F0EFE3", // Light Beige/Off-white - Overall background
      paper: "#F7F7F0", // Slightly lighter beige - Cards and elevated surfaces
    },
    text: {
      primary: "#333333", // Dark Gray for readability
      secondary: "#666666", // Medium Gray for secondary text
    },
    info: {
      main: "#D7F9FA", // Light Blue (kept as utility)
    },
    success: {
      main: "#B0D4B8", // Light Green, from user's palette
    },
    error: {
      main: "#ef5350", // Red for errors (kept as standard)
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      color: "text.primary",
    },
    h3: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "text.primary",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "text.primary",
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: "text.primary",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "primary.main",
          color: "#FFFFFF", // Ensure header text is white
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: "secondary.main",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          transition:
            "background-color 0.3s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out",
        },
        containedPrimary: {
          backgroundColor: "primary.main",
          "&:hover": {
            backgroundColor: "secondary.main",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          },
          color: "#FFFFFF",
        },
        textPrimary: {
          color: "primary.main",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        },
        containedSecondary: {
          backgroundColor: "secondary.main",
          "&:hover": {
            backgroundColor: "primary.light",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
          color: "#333333", // Changed to specific dark gray for clarity
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "primary.main",
          textDecoration: "none",
          transition: "color 0.3s ease-in-out",
          "&:hover": {
            textDecoration: "underline",
            color: "secondary.main",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "background.paper",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "secondary.main",
          transition: "box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "info.main",
          borderRadius: "4px",
          "& .MuiFilledInput-root": {
            backgroundColor: "info.main",
            "&:hover": {
              backgroundColor: "info.light",
            },
            "&.Mui-focused": {
              backgroundColor: "#FFFFFF",
            },
          },
          "& .MuiInputLabel-filled": {
            color: "text.secondary",
          },
          "& .MuiInputBase-input": {
            color: "text.primary",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "background.default",
          border: "1px solid",
          borderColor: "secondary.main",
          transition: "margin 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&.Mui-expanded": {
            margin: "16px 0",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "primary.main",
        },
      },
    },
  },
});

export default theme;

import { createTheme } from "@mui/material/styles";

export const bordertheme = createTheme({
    
  palette: {
    type: 'dark',
    primary: {
      main: '#0f1519',
    },
    secondary: {
      main: '#ffff00',
    },
    text: {
      primary: '#f9f9f9',
    },
    background: {
      default: '#0f1519',
    },
  },
  shape: {
    borderRadius: 15,
  },

  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '14px',
          borderRadius: 16,
          fontFamily: "Lemon-Milk-Light"
        },
      },
    },
  }});
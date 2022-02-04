import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    
    palette: {
      type: 'dark',
      primary: {
        main: '#0f1519',
      },
      secondary: {
        main: 'rgb(0, 100, 100)',
      },
      text: {
        primary: '#123456',
      },
      background: {
        default: '#0f1519',
      },
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
          },
        },
      },
    },
  });
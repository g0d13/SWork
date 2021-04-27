import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
// A custom theme for this app
const lightMuiTheme = createMuiTheme({
  type: "light",
  palette: {
    primary: {
      main: "#4caf50",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#f50057",
    },
    error: {
      main: "#f44336",
    },
    success: {
      main: "#4caf50",
      dark: "#388e3c",
    },
    warning: {
      main: "#ff9800",
    },
    background: {
      default: "#FFF",
      highlight: "#FFF",
    },
  },
});

export const light = responsiveFontSizes(lightMuiTheme);

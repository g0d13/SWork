import { amber } from "@material-ui/core/colors";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
// A custom theme for this app
const lightMuiTheme = createMuiTheme({
  type: "light",
  palette: {
    primary: {
      main: "#757de8",
    },
    secondary: {
      main: amber[500],
      light: "#feefc3",
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
      highlight: "#F1F3F4",
    },
  },
});

export const light = responsiveFontSizes(lightMuiTheme);

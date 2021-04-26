import React from "react";
import { makeStyles, Container, CssBaseline } from "@material-ui/core";
import { light } from "../theme/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import Appbar from "./Appbar";
import Drawer from "./Drawer";
import { ReactQueryDevtools } from "react-query/devtools";
import Navigation from "./Navigation";
import Permission from "../components/Permission";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10px",
    marginBottom: "56px",
  },
  bottomNavigation: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
}));

const Layout = (props) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
      <Appbar />
      <ReactQueryDevtools initialIsOpen={false} />
      <Container className={classes.container}>{props.children}</Container>
      <Drawer />
      <Permission permission="home:read">
        <Navigation />
      </Permission>
    </ThemeProvider>
  );
};

export default Layout;

import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { light } from "../theme/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";

import useIsLoggedIn from "../hooks/useIsLoggedIn";
import Appbar from "./Appbar";
import { links } from "./links";
import Drawer from "./Drawer";
import { requestPermission } from "../utils/requestNotification";
import Permission from "../components/Permission";

import { ReactQueryDevtools } from "react-query/devtools";

requestPermission();

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
  const navigate = useNavigate();
  const classes = useStyles();

  const [value, setValue] = useState("/home");

  useIsLoggedIn({
    cancel: () => {
      navigate("/login");
    },
  });

  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
      <Appbar />
      <ReactQueryDevtools initialIsOpen={false} />
      <Container className={classes.container}>{props.children}</Container>
      <Drawer />
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.bottomNavigation}
        showLabels
      >
        {links.map(({ title, key, icon, route, permission }) => (
          <BottomNavigationAction
            key={key}
            label={title}
            value={route}
            icon={icon}
            onClick={() => {
              setValue(route);
              navigate(route);
            }}
          />
        ))}
      </BottomNavigation>
    </ThemeProvider>
  );
};

export default Layout;

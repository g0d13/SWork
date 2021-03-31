import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Toolbar,
  AppBar,
  IconButton,
  makeStyles,
  Typography,
  Container,
  CssBaseline,
  Badge,
} from "@material-ui/core";
import { light } from "../theme/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";

import {
  Person,
  Bookmark,
  Notifications,
  Home,
  Menu,
  AccountCircle,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: "10px",
  },
  bottomNavigation: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
}));

const Layout = (props) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const navigate = useNavigate();

  const navigateTo = (direction) => {
    navigate(direction);
  };

  return (
    <ThemeProvider theme={light}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Inicio
          </Typography>
          <IconButton
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={() => navigateTo("/notifications")}
          >
            <Badge badgeContent={17} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>{props.children}</Container>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.bottomNavigation}
        showLabels
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          onClick={() => navigateTo("/home")}
        />
        <BottomNavigationAction
          label="Users"
          icon={<Person />}
          onClick={() => navigateTo("/users")}
        />
        <BottomNavigationAction label="Saved" icon={<Bookmark />} />
      </BottomNavigation>
    </ThemeProvider>
  );
};

export default Layout;

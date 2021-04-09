import React, { useEffect, useState } from "react";
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
  Drawer,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Avatar,
  Divider,
} from "@material-ui/core";
import { light } from "../theme/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { useMatch, useNavigate } from "@reach/router";

import {
  Notifications,
  Menu,
  ArrowBack,
  AccountCircle,
  Inbox,
  Mail,
  HomeWork,
  Group,
  History,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: "10px",
    marginBottom: "56px",
  },
  bottomNavigation: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  drawer: {
    width: "400px",
  },
}));

const Layout = (props) => {
  const navigate = useNavigate();
  const match = useMatch("/:el");
  const classes = useStyles();
  const userData = useSelector((state) => state.auth.user);

  const [value, setValue] = useState(0);
  const [shouldBack, setShouldBack] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useIsLoggedIn(
    () => {},
    () => {
      navigate("/login");
    }
  );

  const ui = useSelector((state) => state.ui);

  const navigateTo = (direction) => {
    navigate(direction);
  };

  useEffect(() => {
    setShouldBack(!!!match);
  }, [match]);

  const shouldOpenDrawer = () => {
    if (!shouldBack) {
      setOpenDrawer(true);
    } else {
      navigate(-1);
    }
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
            onClick={shouldOpenDrawer}
          >
            {shouldBack ? <ArrowBack /> : <Menu />}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {ui.title}
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
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(!openDrawer)}
      >
        <Box
          padding="16px"
          paddingX="16px"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Avatar>PN</Avatar>
          <Box paddingLeft="16px" lineHeight="0.1">
            <Typography variant="h6">{userData.firstName}</Typography>
            <Typography variant="caption">{userData.role}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box width={275}>
          <List>
            {["Inicio ", "Bitacoras", "Usuarios", "Historial"].map(
              (text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <Inbox /> : <Mail />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
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
          label="Inicio"
          icon={<HomeWork />}
          onClick={() => navigateTo("/home")}
        />
        <BottomNavigationAction
          label="Usuarios"
          icon={<Group />}
          onClick={() => navigateTo("/users")}
        />
        <BottomNavigationAction label="Historial" icon={<History />} />
      </BottomNavigation>
    </ThemeProvider>
  );
};

export default Layout;

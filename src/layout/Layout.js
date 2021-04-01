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
} from "@material-ui/core";
import { light } from "../theme/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { useMatch, useNavigate } from "@reach/router";

import {
  Person,
  Bookmark,
  Notifications,
  Home,
  Menu,
  ArrowBack,
  AccountCircle,
  Inbox,
  Mail,
} from "@material-ui/icons";
import { useSelector } from "react-redux";

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
  drawer: {
    width: "400px",
  },
}));

const Layout = (props) => {
  const navigate = useNavigate();
  const match = useMatch("/:el");
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [shouldBack, setShouldBack] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

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
        <Box width={275}>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
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

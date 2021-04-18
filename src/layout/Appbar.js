import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Badge,
  makeStyles,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useMatch, useNavigate } from "@reach/router";
import {
  ArrowBack,
  Menu,
  AccountCircle,
  Notifications,
} from "@material-ui/icons";

import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../store/slices/ui";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Appbar = () => {
  const navigate = useNavigate();
  const match = useMatch("/:el");
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);

  const [shouldBack, setShouldBack] = useState(false);

  useEffect(() => {
    setShouldBack(!!!match);
  }, [match]);

  const shouldOpenDrawer = () => {
    if (!shouldBack) {
      dispatch(toggleDrawer(!ui.openDrawer));
    } else {
      navigate(-1);
    }
  };

  const classes = useStyles();

  const actions = () => (
    <React.Fragment>
      <IconButton color="inherit" onClick={() => navigate("/notifications")}>
        <Badge color="secondary">
          <Notifications />
        </Badge>
      </IconButton>
    </React.Fragment>
  );

  return (
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
        {ui.actions?.length === 0 || ui.actions === undefined
          ? actions()
          : ui.actions.map((el, index) => (
              <IconButton color="inherit" key={index} onClick={el.onClick}>
                {el.icon}
              </IconButton>
            ))}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;

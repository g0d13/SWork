import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";

import { getLinks } from "./links";
import { useNavigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  bottomNavigation: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
}));

const Navigation = () => {
  const [value, setValue] = useState();
  const classes = useStyles();
  const navigate = useNavigate();

  const userData = JSON.parse(window.localStorage.getItem("user"));

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={classes.bottomNavigation}
      showLabels
    >
      {getLinks(userData?.role).map(({ title, key, icon, route }) => (
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
  );
};

export default Navigation;

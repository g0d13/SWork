import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import { useEffect, useState } from "react";

import { getLinks } from "./links";
import { useNavigate, useLocation, useMatch } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  bottomNavigation: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
}));

const Navigation = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const match = useMatch("/:el");
  const [show, setShow] = useState();

  useEffect(() => {
    setShow(!!match);
  }, [match]);

  const userData = JSON.parse(window.localStorage.getItem("user"));

  return show ? (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.bottomNavigation}
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
  ) : null;
};

export default Navigation;

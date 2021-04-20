import {
  Drawer as DrawerInternal,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Divider,
  Typography,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../store/slices/ui";
import { getUserData } from "../store/slices/auth";
import { links } from "./links";
import UserAvatar from "../components/UserAvatar";
import { navigate } from "@reach/router";
import Permission from "../components/Permission";
import { useEffect } from "react";

const Drawer = () => {
  const dispatch = useDispatch();
  let userData = useSelector((state) => state.auth.user);
  const drawer = useSelector((state) => state.ui.openDrawer);

  const navigateTo = (route) => {
    dispatch(toggleDrawer(!drawer));
    navigate(route);
  };

  return (
    <DrawerInternal
      anchor="left"
      open={drawer}
      onClose={() => dispatch(toggleDrawer(!drawer))}
    >
      <Box
        padding="16px"
        paddingX="16px"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <UserAvatar name={userData.firstName} />
        <Box paddingLeft="16px" lineHeight="0.1">
          <Typography variant="h6">{userData.firstName}</Typography>
          <Typography variant="caption">{userData.role}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box width={275}>
        <List>
          {links.map(({ route, key, title, icon, permission }) => (
            <Permission permission={permission} key={key}>
              <ListItem button onClick={() => navigateTo(route)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            </Permission>
          ))}
        </List>
      </Box>
    </DrawerInternal>
  );
};

export default Drawer;

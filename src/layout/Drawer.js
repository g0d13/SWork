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
import { getLinks } from "./links";
import UserAvatar from "../components/UserAvatar";
import { useNavigate } from "@reach/router";
import { useAuth } from "../hooks/useAuth";

const Drawer = () => {
  const dispatch = useDispatch();
  const userData = useAuth("user");

  const drawer = useSelector((state) => state.ui.openDrawer);
  let navigate = useNavigate();

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
        <UserAvatar name={JSON.parse(userData)?.email} />
        <Box paddingLeft="16px" lineHeight="0.1">
          <Typography variant="h6">{JSON.parse(userData)?.email}</Typography>
          <Typography variant="caption">
            {JSON.parse(userData)?.role}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box width={275}>
        <List>
          {getLinks(userData?.role).map(
            ({ route, key, title, icon, permission }) => (
              <ListItem key={key} button onClick={() => navigateTo(route)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            )
          )}
        </List>
      </Box>
    </DrawerInternal>
  );
};

export default Drawer;

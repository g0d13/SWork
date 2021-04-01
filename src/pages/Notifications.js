import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { Notifications as Notify } from "@material-ui/icons";
import { useNavigate } from "@reach/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { modifyTitle } from "../store/uiSlice";

const Notifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateTo = (id) => {
    navigate(id);
  };

  useEffect(() => {
    dispatch(modifyTitle("Notificationes"));
  }, []);

  return (
    <List>
      <ListItem button onClick={() => navigateTo("/notify/id")}>
        <ListItemAvatar>
          <Avatar>
            <Notify />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Trabajo 1" secondary="Realizado" />
      </ListItem>
    </List>
  );
};

export default Notifications;

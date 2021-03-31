import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { Notifications as Notify } from "@material-ui/icons";
import { useNavigate } from "@reach/router";

const Notifications = () => {
  const navigate = useNavigate();

  const navigateTo = (id) => {
    navigate(id);
  };

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

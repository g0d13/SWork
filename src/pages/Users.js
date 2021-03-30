import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";

const Users = () => {
  return (
    <List>
      <ListItem button>
        <ListItemText primary="Usuario 1" />
      </ListItem>
    </List>
  );
};

export default Users;

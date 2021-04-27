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
import { useDispatch, useSelector } from "react-redux";
import { modifyUiTitle } from "../store/slices/ui";
import { fetchNotifications, selectAll } from "../store/slices/notifications";
import useStateFetch from "../hooks/useStateFetch";

const Notifications = ({ quantity }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notificationsList = useSelector(selectAll);
  useStateFetch(notificationsList, fetchNotifications());

  useEffect(() => {
    !quantity && dispatch(modifyUiTitle("Notificationes"));
  }, [dispatch, notificationsList, quantity]);

  const getNotificationsList = () => {
    if (quantity === undefined || quantity > notificationsList.length) {
      return notificationsList;
    }
    return notificationsList.splice(0, quantity);
  };
  const repairItem = (request) => (
    <ListItem
      button
      onClick={() => navigate(`/notify/repair/${request.id}`)}
      key={request.id}
    >
      <ListItemAvatar>
        <Avatar>
          <Notify />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Repair" secondary="Realizado" />
    </ListItem>
  );

  const requestItem = (request) => (
    <ListItem
      button
      onClick={() => navigate(`/notify/repair/${request.id}`)}
      key={request.id}
    >
      <ListItemAvatar>
        <Avatar>
          <Notify />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={request.problemCode}
        secondary={request.description}
      />
    </ListItem>
  );

  return (
    <List>
      {getNotificationsList().map((el) =>
        el.isFixed ? repairItem(el) : requestItem(el)
      )}
    </List>
  );
};

export default Notifications;

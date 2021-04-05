import {
  Avatar,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import { useNavigate } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { selectAll, getUsers } from "../store/usersSlice";
import { modifyUiTitle } from "../store/uiSlice";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
}));

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const userList = useSelector(selectAll);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((e) => e[0])
      .join("");

  useEffect(() => {
    if (userList.length === 0) dispatch(getUsers());
    dispatch(modifyUiTitle("Usuarios"));
  }, [dispatch, userList]);

  return (
    <>
      <List>
        {userList.map((el, index) => {
          return (
            <ListItem
              button
              onClick={() => navigate(`/users/${el.id}`)}
              key={index}
            >
              <ListItemAvatar>
                <Avatar>{getInitials(el.firstName)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={el.firstName} secondary={el.role} />
            </ListItem>
          );
        })}
      </List>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => navigate("/users/add")}
      >
        <PersonAdd />
      </Fab>
    </>
  );
};

export default Users;

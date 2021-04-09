import React from "react";
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
import { useSelector } from "react-redux";

import { selectAll, getUsers } from "../store/slices/users";
import { makeStyles } from "@material-ui/core/styles";
import useUiTitle from "../hooks/useUiTitle";
import useStateFetch from "../hooks/useStateFetch";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
  listContainer: {
    marginTop: "-20px",
  },
}));

const Users = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const userList = useSelector(selectAll);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((e) => e[0])
      .join("");

  useUiTitle("Usuarios");

  useStateFetch(userList, getUsers());

  return (
    <React.Fragment>
      <List className={classes.listContainer}>
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
    </React.Fragment>
  );
};

export default Users;

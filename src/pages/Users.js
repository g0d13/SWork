import React from "react";
import {
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import { useNavigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "react-query";

import useUiTitle from "../hooks/useUiTitle";
import UserAvatar from "../components/UserAvatar";

import httpClient from "../api/httpClient";

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
  const { isLoading, error, data } = useQuery("users", async () => {
    const response = await httpClient.get("api/user");
    return response.data;
  });

  useUiTitle("Usuarios");

  if (isLoading) return <p>Cargando</p>;
  if (error) return navigate("/login");

  return (
    <React.Fragment>
      <List className={classes.listContainer}>
        {data.map((el, index) => {
          return (
            <ListItem
              button
              onClick={() => navigate(`/user/${el.id}`)}
              key={index}
            >
              <ListItemAvatar>
                <UserAvatar name={el.firstName} />
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
        onClick={() => navigate("/user/add")}
      >
        <PersonAdd />
      </Fab>
    </React.Fragment>
  );
};

export default Users;

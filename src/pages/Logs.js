import React from "react";
import { Fab, Grid, Zoom } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";
import { useQuery } from "react-query";

import LogItem from "../components/LogItem";
import useUiTitle from "../hooks/useUiTitle";
import Permission from "../components/Permission";
import httpClient from "../api/httpClient";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
}));

const Logs = () => {
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery("logs", async () => {
    const response = await httpClient.get("/api/log");
    return response.data;
  });

  const classes = useStyles();

  useUiTitle("Inicio");
  if (isLoading) return <p>Loading</p>;
  if (error) return navigate("/login");

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {data.map((el, index) => (
          <Grid item xs={12} sm={6} lg={4} key={el.id}>
            <LogItem log={el} />
          </Grid>
        ))}
      </Grid>
      <Permission permission="log:create">
        <Zoom in={true} style={{ transitionDelay: "225ms" }} unmountOnExit>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fab}
            onClick={() => navigate("/log/add")}
          >
            <Add />
          </Fab>
        </Zoom>
      </Permission>
    </React.Fragment>
  );
};

export default Logs;

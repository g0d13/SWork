import React from "react";
import { Fab, Grid, Typography, Zoom } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";

import LogItem from "../components/LogItem";
import { fetchLogs, selectAll } from "../store/slices/logs";
import useUiTitle from "../hooks/useUiTitle";
import useStateFetch from "../hooks/useStateFetch";
import Permission from "../components/Permission";
import Machines from "./Machines";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
}));

const Logs = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(true);

  const logList = useSelector(selectAll);
  const classes = useStyles();

  useUiTitle("Inicio");
  useStateFetch(logList, fetchLogs());

  return (
    <React.Fragment>
      <Typography>Logs </Typography>
      <Grid container spacing={3}>
        {logList.map((el, index) => (
          <Grid item xs={12} sm={6} lg={4} key={el.logId}>
            <LogItem log={el} />
          </Grid>
        ))}
      </Grid>
      <Typography>Maquinas recientes </Typography>
      <Machines quantity={4} />
      <Permission permission="log:create">
        <Zoom
          in={checked}
          style={{ transitionDelay: checked ? "225ms" : "0ms" }}
          unmountOnExit
        >
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

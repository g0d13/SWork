import React, { useEffect } from "react";
import { Fab, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";

import LogItem from "../components/LogItem";
import { getLogs, selectAll } from "../store/logsSlice";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
}));

const Logs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logList = useSelector(selectAll);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getLogs());
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          {logList.map((el, index) => (
            <LogItem log={el} key={el.logId} />
          ))}
        </Grid>
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => navigate("/users/add")}
      >
        <Add />
      </Fab>
    </>
  );
};

export default Logs;

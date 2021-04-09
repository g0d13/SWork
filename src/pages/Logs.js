import React, { useEffect } from "react";
import { Fab, Grid, Zoom } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";

import LogItem from "../components/LogItem";
import { fetchLogs, selectAll } from "../store/slices/logs";
import { modifyUiTitle } from "../store/slices/ui";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
}));

const Logs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(true);

  const logList = useSelector(selectAll);
  const classes = useStyles();

  useEffect(() => {
    if (logList.length === 0) dispatch(fetchLogs());
    dispatch(modifyUiTitle("Inicio"));
  }, [dispatch, logList]);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {logList.map((el, index) => (
          <Grid item xs={12} sm={6} lg={4} key={el.logId}>
            <LogItem log={el} />
          </Grid>
        ))}
      </Grid>
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
    </React.Fragment>
  );
};

export default Logs;

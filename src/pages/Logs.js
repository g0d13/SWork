import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getLogs } from "../store/logsSlice";
import LogItem from "../components/LogItem";

const Logs = () => {
  const dispatch = useDispatch();
  const { logList } = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(getLogs());
  }, [dispatch]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          {logList.map((el, index) => (
            <LogItem log={el} key={index} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Logs;

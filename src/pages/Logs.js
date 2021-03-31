import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { useNavigate } from "@reach/router";
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

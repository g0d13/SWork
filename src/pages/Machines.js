import {
  Card,
  CardContent,
  Box,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { fetchMachines, selectAll } from "../store/slices/machines";
import useStateFetch from "../hooks/useStateFetch";
import MachineIcon from "../assets/machine.svg";
import { useState } from "react";
const useStyles = makeStyles({
  machine: {
    display: "flex",
    width: "250px",
  },
  logo: {
    padding: "1em",
  },
});

const MachineItem = ({ machine }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent className={classes.machine}>
        <img src={MachineIcon} className={classes.logo} alt="logo" />
        <Box>
          <Typography>{machine.identifier}</Typography>
          <Typography>{machine.model}</Typography>
          <Typography>{machine.brand}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const Machines = ({ quantity }) => {
  const machineList = useSelector(selectAll);
  const dispatch = useDispatch();

  useState(() => {
    dispatch(fetchMachines());
  }, []);

  const getMachineList = () => {
    if (quantity > machineList.length) {
      return machineList;
    }
    return machineList.splice(0, quantity);
  };

  return (
    <Grid container spacing={2}>
      {getMachineList().map((el) => (
        <Grid item key={el.machineId} xs={6} sm={4} lg={3}>
          <MachineItem machine={el} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Machines;

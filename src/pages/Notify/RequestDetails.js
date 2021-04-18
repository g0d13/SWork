import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import ChipSelector from "../../components/ChipSelector";
import useUiTitle from "../../hooks/useUiTitle";
import { useSelector } from "react-redux";
import { selectById } from "../../store/slices/notifications";

const useStyles = makeStyles({
  maxWidth: {
    width: "100%",
  },
  flexDisplay: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    color: "rgba(0, 0, 0, 0.54)",
  },
});

const RequestDetails = ({ id }) => {
  const classes = useStyles();
  const request = useSelector((state) => selectById(state, id));

  useUiTitle(request.problemCode);

  // eslint-disable-next-line no-unused-vars
  const [priority, setPriority] = useState();
  // eslint-disable-next-line no-unused-vars
  const arrivalTime = () => new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography>Descripcion {request.description}</Typography>
            <Typography variant="caption" align="right">
              Creada {request.createdAt}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} className={classes.flexDisplay}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" className={classes.label}>
              Severidad del problema
            </Typography>
            <ChipSelector
              items={["Baja", "Media", "Alta"]}
              onSelect={(e) => setPriority(e)}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography>Supervisor {request.supervisorId}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography>Maquina {request.machineId}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography>Log {request.logId}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default RequestDetails;

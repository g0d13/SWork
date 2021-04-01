import { Button, Grid, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { modifyTitle } from "../../store/uiSlice";

const Request = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(modifyTitle("Hacer solicitud"));
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Codigo del problema" variant="outlined" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Descripcion" variant="outlined" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Prioridad" variant="outlined" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Supervisor" variant="outlined" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Maquina" variant="outlined" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button color="primary">Enviar</Button>
      </Grid>
    </Grid>
  );
};
export default Request;

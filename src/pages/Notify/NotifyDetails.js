import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import ChipSelector from "../../components/ChipSelector";

const useStyles = makeStyles((theme) => ({
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
}));

const NotifyDetails = () => {
  const classes = useStyles();
  const [priority, setPriority] = useState();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Hora de llegada: </Typography>
          <Typography variant="body2">
            {new Date().toJSON().slice(0, 10).replace(/-/g, "/")}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.flexDisplay}>
          <Typography variant="subtitle1" className={classes.label}>
            Severidad del problema
          </Typography>
          <ChipSelector
            items={["Baja", "Media", "Alta"]}
            onSelect={(e) => setPriority(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.maxWidth}
            id="outlined-multiline-static"
            label="Detalles adicionales del problema"
            multiline
            rows={4}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={<Switch checked={true} name="checkedA" />}
              label="reparado"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Button color="primary">Enviar</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NotifyDetails;

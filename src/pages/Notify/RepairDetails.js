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
import useUiTitle from "../../hooks/useUiTitle";

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

const RepairDetails = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [priority, setPriority] = useState();
  const [checked, setChecked] = useState(false);

  useUiTitle("Repair details");

  // eslint-disable-next-line no-unused-vars
  const arrivalTime = () => new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  return (
    <Grid container spacing={2}>
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
            control={
              <Switch
                checked={checked}
                onChange={() => setChecked(!checked)}
                name="isFixed"
              />
            }
            label="reparado"
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <Button color="primary">Enviar</Button>
      </Grid>
    </Grid>
  );
};

export default RepairDetails;

import React from "react";
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
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles({
  maxWidth: {
    width: "100%",
  },
  flexDisplay: {
    display: "flex",
    flexDirection: "column",
  },
});

const NotifyDetails = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography>Marcar hora de llegada</Typography>
          <Typography variant="body2">
            {new Date().toJSON().slice(0, 10).replace(/-/g, "/")}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.flexDisplay}>
          <Typography>Severidad del problema</Typography>
          <Rating name="severity" max={3} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.maxWidth}
            id="outlined-multiline-static"
            label="Detalles adicionales del problema"
            multiline
            rows={4}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormGroup row>
            <FormControlLabel
              control={<Switch checked={true} name="checkedA" />}
              label="reparado"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Button>Enviar</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NotifyDetails;

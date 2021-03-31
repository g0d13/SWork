import {
  Button,
  Chip,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
const useStyles = makeStyles({
  inputWith: {
    width: "100%",
  },
  button: {
    display: "flex",
    justifyContent: "center",
  },
  blockWidth: {
    display: "flex",
    flexDirection: "column",
    "& div ": {
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },
  },
});
const Request = () => {
  const classes = useStyles();
  return (
    <>
      <form noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.inputWith}
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.inputWith}
              id="outlined-basic"
              label="Detalles adicionales"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.blockWidth}>
            <Typography color="textSecondary">Categorias</Typography>
            <div>
              <Chip label="Categoria 1" />
              <IconButton color="primary" component="span">
                <Add />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.blockWidth}>
            <Typography color="textSecondary">Maquinas</Typography>
            <div>
              <Chip label="Maquina   1" />
              <IconButton color="primary" component="span">
                <Add />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.button}>
            <Button color="primary">Enviar</Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Request;

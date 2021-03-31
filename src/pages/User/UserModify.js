import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  inputWidth: {
    width: "100%",
  },
  blockWidth: {
    display: "flex",
    justifyContent: "center",
  },
});

const UserModify = () => {
  const classes = useStyles();

  return (
    <>
      <form noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.inputWidth}
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.inputWidth}
              id="outlined-basic"
              label="Apellidos"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.inputWidth}
              id="outlined-basic"
              label="Correo"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.inputWidth}
              id="outlined-basic"
              label="Contrasenia"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.inputWidth}
              id="outlined-basic"
              label="Rol"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} className={classes.blockWidth}>
            <Button color="primary">Enviar</Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default UserModify;

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import Chip from "@material-ui/core/Chip";
import { Add } from "@material-ui/icons";
import { modifyTitle } from "../../store/uiSlice";
import { useDispatch } from "react-redux";
import SearchAdd from "../../components/SearchAdd";

const useStyles = makeStyles({
  blockWidth: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    color: "rgba(0, 0, 0, 0.54)",
  },
});

const validationSchema = yup.object({
  name: yup.string("Ingresa el nombre").required("El nombre es requerido"),
  details: yup.string("Detalles"),
});

const LogModify = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openSearch, setOpenSearch] = useState();

  useEffect(() => {
    dispatch(modifyTitle(props.id ? "Editar bitacora" : "Agregar bitacora"));
  }, [dispatch, props.id]);

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          details: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            setOpenSearch(true);
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.blockWidth}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} className={classes.blockWidth}>
                <Typography className={classes.label}>
                  Datos generales
                </Typography>
                <Field
                  component={TextField}
                  variant="outlined"
                  name="name"
                  fullWidth
                  label="Nombre "
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.blockWidth}>
                <Field
                  component={TextField}
                  variant="outlined"
                  fullWidth
                  label="Detalles"
                  name="details"
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
                <Typography className={classes.label}>
                  Mecanico encargado
                </Typography>
                <div>
                  <Chip label="Mecanico" />
                  <IconButton color="primary" component="span">
                    <Add />
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={12}>
                {isSubmitting && <LinearProgress />}
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <SearchAdd open={openSearch} onClose={() => {}} />
    </>
  );
};

export default LogModify;

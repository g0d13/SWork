import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { Add } from "@material-ui/icons";
import { useSelector } from "react-redux";
import SearchAdd from "../../components/SearchAdd";
import {
  fetchCategories,
  selectAll as selectAllCategories,
} from "../../store/categoriesSlice";
import {
  getUsers,
  selectAll as selectAllMechanics,
} from "../../store/usersSlice";
import useUiTitle from "../../hooks/useUiTitle";
import * as yup from "yup";
import useStateFetch from "../../hooks/useStateFetch";
import { useFormik } from "formik";

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
  name: yup
    .string()
    .min(2, "El nombre es muy corto")
    .max(50, "El nombre es muy largo")
    .required("Nombre es requerido"),
  details: yup
    .string()
    .min(2, "Detalles muy corto")
    .max(500, "Detalles es muy largo"),
  categories: yup.array().required(),
  mechanic: yup.string(),
});

const LogModify = (props) => {
  const classes = useStyles();
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [showMechanics, setShowMechanics] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState([]);

  const categoriesList = useSelector(selectAllCategories);
  const mechanicsList = useSelector(selectAllMechanics);

  useUiTitle(props.id ? "Editar bitacora" : "Agregar bitacora");
  useStateFetch(categoriesList, fetchCategories());
  useStateFetch(mechanicsList, getUsers());

  const formik = useFormik({
    initialValues: {
      name: "",
      details: "",
      categories: [],
      mechanic: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const postLog = {
        ...values,
        categories: selectedCategories.map((el) => el.categoryId),
        mechanic: selectedMechanic[0].id,
      };
      if (props.id) {
        const updateLog = {
          ...postLog,
          logId: props.id,
        };
      } else {
        // create log
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className={classes.label}>Datos generales</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.blockWidth}>
          <TextField
            variant="outlined"
            name="name"
            fullWidth
            label="Nombre "
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.blockWidth}>
          <TextField
            variant="outlined"
            fullWidth
            label="Detalles"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            error={formik.touched.details && Boolean(formik.errors.details)}
            helperText={formik.touched.details && formik.errors.details}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.blockWidth}>
          <Typography color="textSecondary">Categorias</Typography>
          <Box>
            {selectedCategories.map((el) => (
              <Chip label={el.name} variant="outlined" key={el.categoryId} />
            ))}
            <IconButton
              color="primary"
              component="span"
              onClick={() => setShowCategories(!showCategories)}
            >
              <Add />
            </IconButton>
            <SearchAdd
              open={showCategories}
              title="categoria"
              onClose={(v) => setShowCategories(v)}
              onSelect={(v) => setSelectedCategories([...v])}
              selected={selectedCategories}
              searchIn={categoriesList}
              itemKey="categoryId"
              textKey="name"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.blockWidth}>
          <Typography className={classes.label}>Mecanico encargado</Typography>
          <Box>
            {selectedMechanic.map((el) => (
              <Chip label={el.firstName} variant="outlined" />
            ))}
            <IconButton
              color="primary"
              component="span"
              onClick={() => setShowMechanics(!showMechanics)}
            >
              <Add />
            </IconButton>
            <SearchAdd
              open={showMechanics}
              title="mecanico"
              onlyOne
              onClose={(v) => setShowMechanics(v)}
              onSelect={(v) => setSelectedMechanic([...v])}
              selected={selectedMechanic}
              searchIn={mechanicsList}
              itemKey="id"
              textKey="firstName"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" type="submit">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LogModify;

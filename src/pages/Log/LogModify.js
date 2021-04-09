import React, { useState } from "react";
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
} from "../../store/slices/categories";
import { useDispatch } from "react-redux";
import {
  getUsers,
  selectAll as selectAllMechanics,
} from "../../store/slices/users";
import useUiTitle from "../../hooks/useUiTitle";
import * as yup from "yup";
import useStateFetch from "../../hooks/useStateFetch";
import { useFormik } from "formik";
import { postLog } from "../../store/slices/logs";
import TextInput from "../../components/TextInput";

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

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      details: "",
      categories: [],
      mechanic: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const log = {
        ...values,
        categories: selectedCategories.map((el) => el.categoryId),
        mechanic: selectedMechanic[0].id,
      };
      if (props.id) {
        const updateLog = {
          ...log,
          logId: props.id,
        };
        console.log(updateLog);
      } else {
        dispatch(postLog(log));
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
          <TextInput name="name" label="Nombre" formik={formik} />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.blockWidth}>
          <TextInput label="Detalles" name="details" formik={formik} />
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
              visible={[showCategories, setShowCategories]}
              selectedItems={[selectedCategories, setSelectedCategories]}
              config={{
                title: "categoria",
                searchIn: categoriesList,
                itemKey: "categoryId",
                textKey: "name",
              }}
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
              visible={[showMechanics, setShowMechanics]}
              selectedItems={[selectedMechanic, setSelectedMechanic]}
              config={{
                title: "mecanico",
                searchIn: mechanicsList,
                itemKey: "id",
                textKey: "firstName",
                onlyOne: true,
              }}
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

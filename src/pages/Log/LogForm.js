import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Typography, Button, Box, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "react-query";
import { fetchCategories } from "../../api/categoriesAPI";
import { fetchAllMechanics } from "../../api/usersAPI";

import TextInput from "../../components/TextInput";
import GridView from "../../components/GridView";
import SearchAddWrapper from "../../components/SearchAddWrapper";

const useStyles = makeStyles({
  blockWidth: {
    display: "flex",
    justifyContent: "center",
  },
  label: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  chipsLevel: {
    display: "flex",
    gap: "8px",
  },
});

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .required("El nombre es requerido"),
  details: yup
    .string()
    .min(2, "El campo debe ser mayor a dos caracteres")
    .required("Es requerido colocar detalles"),
});

const LogForm = ({ defaultValues, onFormSubmit }) => {
  const classes = useStyles();
  const showCategories = useState(false);
  const selectedCategories = useState(defaultValues.categories ?? []);
  const showMechanic = useState(false);
  const selectedMechanics = useState(
    defaultValues.mechanic ? [defaultValues.mechanic] : []
  );

  const mechanicsQuery = useQuery("users", fetchAllMechanics);
  const categororiesQuery = useQuery("categories", fetchCategories);

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const categories = selectedCategories[0].map((el) => el.id);
      const mechanic = selectedMechanics[0][0]?.id;
      onFormSubmit({ ...values, categories, mechanic });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <GridView>
        <Typography sm={12} className={classes.label}>
          Datos generales
        </Typography>
        <TextInput name="name" label="Nombre" formik={formik} />
        <TextInput label="Detalles" name="details" formik={formik} />
        <Typography sm={12} color="textSecondary">
          Categorias
        </Typography>
        <Box sm={12} display="flex" gridGap="10px" alignItems="center">
          {selectedCategories[0].map((el) => (
            <Chip label={el.name} variant="outlined" key={el.id} />
          ))}
          {!categororiesQuery.isLoading && (
            <SearchAddWrapper
              show={showCategories}
              config={{
                title: "categoria",
                selectedItems: selectedCategories,
                searchIn: categororiesQuery.data,
                textKey: "name",
                apiName: "category",
              }}
            />
          )}
        </Box>
        <Typography sm={12} color="textSecondary">
          Mecanico
        </Typography>
        <Box sm={12} display="flex" gridGap="10px" alignItems="center">
          {selectedMechanics[0].map((el) => (
            <Chip label={el.firstName} variant="outlined" key={el.id} />
          ))}
          {!mechanicsQuery.isLoading && (
            <SearchAddWrapper
              show={showMechanic}
              config={{
                title: "mecanico",
                selectedItems: selectedMechanics,
                searchIn: mechanicsQuery.data,
                textKey: "firstName",
                apiName: "user",
                onlyOne: true,
              }}
            />
          )}
        </Box>
        <Button sm={12} color="primary" type="submit">
          Guardar
        </Button>
      </GridView>
    </form>
  );
};

export default LogForm;

import React from "react";
import { Button, Grid } from "@material-ui/core";
import TextInput from "../../components/TextInput";
import { useFormik } from "formik";
import * as yup from "yup";
import useUiTitle from "../../hooks/useUiTitle";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  details: yup.string(),
});

const CategoryModify = (props) => {
  useUiTitle(props.id ? "Editar categoria" : "Agregar categoria");
  const formik = useFormik({
    initialValues: {
      name: "",
      details: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (props.id) {
        console.log("update category");
      } else {
      }
    },
  });
  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextInput
              name="name"
              label="Nombre de la categoria"
              formik={formik}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput name="details" label="Detalles" formik={formik} />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" type="submit">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};
export default CategoryModify;

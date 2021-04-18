import React from "react";
import { Button, Grid } from "@material-ui/core";
import TextInput from "../../components/TextInput";
import { useFormik } from "formik";
import * as yup from "yup";
import useUiTitle from "../../hooks/useUiTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  postCategory,
  putCategory,
  selectById,
} from "../../store/slices/categories";
import { useNavigate } from "@reach/router";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  details: yup.string(),
});

const CategoryModify = (props) => {
  const category = useSelector((state) => selectById(state, props.id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useUiTitle(props.id ? "Editar categoria" : "Agregar categoria");
  const formik = useFormik({
    initialValues: category || {
      name: "",
      details: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (props.id) {
        dispatch(putCategory(values));
      } else {
        dispatch(postCategory(values));
      }
      navigate(-1);
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

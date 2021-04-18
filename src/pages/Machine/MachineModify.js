import React from "react";
import { Button, Grid } from "@material-ui/core";
import TextInput from "../../components/TextInput";
import { useFormik } from "formik";
import * as yup from "yup";
import useUiTitle from "../../hooks/useUiTitle";
import { postMachine, putMachine } from "../../store/slices/machines";
import { useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";

const validationSchema = yup.object({
  identifier: yup.string().required("El nombre es requerido"),
  model: yup.string().required("El modelo es requerido"),
  brand: yup.string(),
});

const MachineModify = (props) => {
  useUiTitle(props.id ? "Editar maquina" : "Agregar maquina");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      identifier: "",
      model: "",
      brand: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (props.id) {
        dispatch(putMachine({ machineId: props.id, ...values }));
      } else {
        dispatch(postMachine(values));
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
              name="identifier"
              label="Identificador"
              formik={formik}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput name="model" label="Modelo" formik={formik} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput name="brand" label="Marca" formik={formik} />
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
export default MachineModify;

import React from "react";
import { Box, Button } from "@material-ui/core";
import TextInput from "../../components/TextInput";
import { useFormik } from "formik";
import * as yup from "yup";
import useUiTitle from "../../hooks/useUiTitle";
import { postMachine, putMachine } from "../../store/slices/machines";
import { useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
import GridView from "../../components/GridView";
import { Add } from "@material-ui/icons";

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
        <GridView>
          <TextInput name="identifier" label="Identificador" formik={formik} />
          <TextInput name="model" label="Modelo" formik={formik} />
          <TextInput name="brand" label="Marca" formik={formik} />
          <Box sm={12} display="flex" justifyContent="center">
            <Button color="primary" type="submit" startIcon={<Add />}>
              Agregar
            </Button>
          </Box>
        </GridView>
      </form>
    </React.Fragment>
  );
};
export default MachineModify;

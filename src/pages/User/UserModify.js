import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createUser, selectById } from "../../store/slices/users";
import ChipSelector from "../../components/ChipSelector";
import useUiTitle from "../../hooks/useUiTitle";
import TextInput from "../../components/TextInput";

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
  firstName: yup
    .string()
    .min(2, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .required("El nombre es requerido"),
  lastName: yup
    .string()
    .min(2, "Apellido muy corto")
    .max(50, "Apellido muy largo"),
  email: yup
    .string()
    .email("Ingresa un correo valido")
    .required("el correo es necesario"),
  password: yup
    .string("Ingresa tu contrasenia")
    .min(8, "La contrasena debe ser de 8 caracteres como minimo")
    .required("La contrasena es requerida"),
});

const UserModify = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => selectById(state, props.id));
  const [role, setRole] = useState();

  useUiTitle(props.id ? `Editar ${user.firstName}` : "Agregar usuario");

  const formik = useFormik({
    initialValues: user || {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (props.id) {
        console.log("update user");
      } else {
        dispatch(createUser({ ...values, role }));
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.label}>Datos generales</Typography>
            <TextInput name="firstName" label="Nombre" formik={formik} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput name="lastName" label="Apellidos" formik={formik} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput name="email" label="Correo" formik={formik} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              type="password"
              name="password"
              label="Password"
              formik={formik}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.label}>Datos generales</Typography>
            <ChipSelector
              items={["Mechanic", "Supervisor"]}
              selected={user?.role ?? "Mechanic"}
              onSelect={(e) => setRole(e)}
            />
          </Grid>
          <Grid item xs={12} className={classes.blockWidth}>
            <Button color="primary" type="submit">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default UserModify;

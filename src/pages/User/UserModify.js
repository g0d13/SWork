import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createUser, selectById } from "../../store/usersSlice";
import ChipSelector from "../../components/ChipSelector";
import useUiTitle from "../../hooks/useUiTitle";

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
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="Nombre"
              variant="outlined"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Apellidos"
              variant="outlined"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Correo"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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

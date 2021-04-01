import React from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { useFormik } from "formik";

const useStyles = makeStyles({
  blockWidth: {
    display: "flex",
    justifyContent: "center",
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

const UserModify = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("supervisor");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Rol</FormLabel>
              <RadioGroup name="role" value={value} onChange={handleChange}>
                <FormControlLabel
                  value="Supervisor"
                  name="Supervisor"
                  control={<Radio />}
                  label="Supervisor"
                />
                <FormControlLabel
                  value="Mechanic"
                  name="Mechanic"
                  control={<Radio />}
                  label="Mecanico"
                />
              </RadioGroup>
            </FormControl>
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

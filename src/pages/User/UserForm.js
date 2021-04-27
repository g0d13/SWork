import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Typography, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChipSelector from "../../components/ChipSelector";
import TextInput from "../../components/TextInput";
import GridView from "../../components/GridView";

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
    .min(6, "Debe contener al menos  6 caracteres "),
});

const UserForm = ({ defaultValues, onFormSubmit, children }) => {
  const classes = useStyles();
  const [role, setRole] = useState(defaultValues.role ?? "MECHANIC");
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => onFormSubmit({ ...values, role }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <GridView>
        <Typography sm={12} className={classes.label}>
          Datos generales
        </Typography>
        <TextInput name="firstName" label="Nombre" formik={formik} />
        <TextInput name="lastName" label="Apellidos" formik={formik} />
        <TextInput name="email" label="Correo" formik={formik} />
        <TextInput
          type="password"
          name="password"
          label="Password"
          formik={formik}
        />
        <Typography sm={12} className={classes.label}>
          Rol
        </Typography>
        <ChipSelector
          items={[
            { value: "MECHANIC", label: "Mecanico" },
            { value: "SUPERVISOR", label: "Supervisor" },
          ]}
          selected={role}
          onSelect={setRole}
        />
        <Box sm={12} display="flex" justifyContent="center">
          <Button color="primary" type="submit">
            Guardar
          </Button>
        </Box>
      </GridView>
    </form>
  );
};

export default UserForm;

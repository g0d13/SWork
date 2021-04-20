import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Typography, Button } from "@material-ui/core";
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
    .min(8, "La contrasena debe ser de 8 caracteres como minimo")
    .required("La contrasena es requerida"),
});

const UserForm = ({ defaultValues, onFormSubmit, children }) => {
  const classes = useStyles();
  const [role, setRole] = useState("Mechanic");

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: validationSchema,
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
          items={["Mechanic", "Supervisor"]}
          selected={defaultValues?.role ?? "Mechanic"}
          onSelect={setRole}
        />
        <Button sm={12} color="primary" type="submit">
          Enviar
        </Button>
      </GridView>
    </form>
  );
};

export default UserForm;

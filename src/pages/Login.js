import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import TextInput from "../components/TextInput";
import { useMutation } from "react-query";
import { login } from "../api/authAPI.js";

const useStyles = makeStyles({
  root: {
    display: "grid",
    placeItems: "center",
    fontFamily: "sans",
    height: "100vh",
  },
  card: {
    width: "350px",
    maxWidth: "450px",
  },
  form: {
    "& *": {
      marginTop: "10px",
    },
  },
  center: {
    width: "100%",
    textAlign: "center",
    color: "red",
  },
});

const validationSchema = yup.object({
  email: yup
    .string("Ingresa tu correo")
    .email("Ingresa un correo valido")
    .required("El correo es requerido"),
  password: yup
    .string("Ingresa tu contrasenia")
    .required("La contrasena es requerida"),
});

const Login = () => {
  const classes = useStyles();
  const loginMutation = useMutation("login", login);

  const formik = useFormik({
    initialValues: {
      email: "jdpm0699@gmail.com",
      password: "jdpm0699",
    },
    validationSchema: validationSchema,
    onSubmit: (data) => loginMutation.mutate(data),
  });

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">Inicia sesion</Typography>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <TextInput
              name="email"
              label="Correo electronico"
              formik={formik}
            />
            <TextInput name="password" type="password" formik={formik} />
            <Box className={classes.center}>
              <Typography variant="subtitle1">
                {loginMutation.error && loginMutation.error.message}
              </Typography>
            </Box>
            <Button fullWidth color="primary" type="submit">
              Iniciar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

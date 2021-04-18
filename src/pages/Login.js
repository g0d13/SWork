import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../store/slices/auth";
import { useNavigate } from "@reach/router";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import TextInput from "../components/TextInput";

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
    .min(8, "La contrasena debe ser de 8 caracteres como minimo")
    .required("La contrasena es requerida"),
});

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  useIsLoggedIn({
    ok: () => {
      navigate("/home");
    },
  });

  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      email: "1234abcd@email.com",
      password: "abcd1234",
    },
    validationSchema: validationSchema,
    onSubmit: (data) => {
      dispatch(doLogin(data));
    },
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
              <Typography variant="subtitle1">{loginState.message}</Typography>
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

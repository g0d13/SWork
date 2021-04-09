import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { doLogin } from "../store/slices/auth";
import { useNavigate } from "@reach/router";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import TextInput from "../components/TextInput";
import { useSnackbar } from "notistack";

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
  useIsLoggedIn(() => {
    navigate("/home");
  });

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: "1234abcd@email.com",
      password: "1234abcd",
    },
    validationSchema: validationSchema,
    onSubmit: (data) => {
      dispatch(doLogin(data)).then((e) => {
        if (e.error?.message) {
          enqueueSnackbar("Usuario y/o contrasenia incorrecta", {
            variant: "Error",
          });
        }
      });
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

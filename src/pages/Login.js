import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";

const useStyles = makeStyles({
  root: {
    display: "grid",
    placeItems: "center",
    fontFamily: "sans",
    height: "100vh",
  },
  card: {
    width: "450px",
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">Inicia sesion</Typography>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <TextField
              fullWidth
              name="email"
              label="Correo"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
            />
            <TextField
              fullWidth
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
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

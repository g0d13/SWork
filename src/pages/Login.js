import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core";
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
  textInput: {
    width: "100%",
    marginTop: "10px",
    marginBottom: "10px",
  },
});

const Login = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">Inicia sesion</Typography>
          <Divider />
        </CardContent>
        <CardContent>
          <form noValidate autoComplete>
            <TextField
              className={classes.textInput}
              id="outlined-basic"
              label="Username"
              variant="outlined"
            />
            <TextField
              className={classes.textInput}
              id="outlined-password"
              label="Password"
              variant="outlined"
            />
            <Button className={classes.textInput} color="primary">
              Iniciar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

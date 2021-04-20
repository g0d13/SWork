import { CircularProgress, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "grid",
    placeItems: "center",
  },
});

const Loading = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <CircularProgress {...props} />
    </Box>
  );
};
export default Loading;

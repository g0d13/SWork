import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
}));
const GridView = ({ children }) => {
  if (!children.length) {
    children = [children];
  }
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      {children.map((el, index) => (
        <Grid item xs={el.props?.xs ?? 12} sm={el.props?.sm ?? 6} key={index}>
          {el}
        </Grid>
      ))}
    </Grid>
  );
};

export default GridView;

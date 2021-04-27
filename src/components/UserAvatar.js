import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  green: {
    backgroundColor: theme.palette.primary.light,
  },
}));

const UserAvatar = ({ name }) => {
  const classes = useStyles();
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((e) => e[0])
    .join("");
  return <Avatar className={classes.green}>{initials}</Avatar>;
};

export default UserAvatar;

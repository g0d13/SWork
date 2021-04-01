import {
  Avatar,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { Person, Add } from "@material-ui/icons";
import { useNavigate } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../store/usersSlice";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
}));

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { userList } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <List>
        {userList.map((el, index) => {
          return (
            <ListItem
              button
              onClick={() => navigate(`/users/${el.userId}`)}
              key={index}
            >
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={el.firstName} secondary={el.role} />
            </ListItem>
          );
        })}
      </List>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => navigate("/users/add")}
      >
        <Add />
      </Fab>
    </>
  );
};

export default Users;

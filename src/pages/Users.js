import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { useNavigate } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../store/usersSlice";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
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
  );
};

export default Users;

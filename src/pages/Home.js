import React from "react";
import { Add } from "@material-ui/icons";
import { Zoom, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";
import Logs from "./Logs";
import Permission from "../components/Permission";
import Requests from "./Requests";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
}));

const Home = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <React.Fragment>
      <Permission permission="log:read">
        <Logs />
      </Permission>
      <Permission permission="log:repair">
        <Requests />
      </Permission>
      <Permission permission="log:create">
        <Zoom in={true} style={{ transitionDelay: "225ms" }} unmountOnExit>
          <Fab
            color="primary"
            className={classes.fab}
            onClick={() => navigate("/log/add")}
          >
            <Add />
          </Fab>
        </Zoom>
      </Permission>
    </React.Fragment>
  );
};

export default Home;

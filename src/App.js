import React from "react";
import { Provider } from "react-redux";
import { Router } from "@reach/router";
import store from "./store";
import { SnackbarProvider } from "notistack";
import Slide from "@material-ui/core/Slide";

import Layout from "./layout/Layout";
import Logs from "./pages/Logs";
import Users from "./pages/Users";
import Login from "./pages/Login";
import LogModify from "./pages/Log/LogModify";
import UserModify from "./pages/User/UserModify";
import Notifications from "./pages/Notifications";
import NotifyDetails from "./pages/Notify/NotifyDetails";
import RepairDetails from "./pages/Notify/RepairDetails";
import RequestDetails from "./pages/Notify/RequestDetails";
import Request from "./pages/Log/Request";
import MachineModify from "./pages/Machine/MachineModify";
import CategoryModify from "./pages/Category/CategoryModify";
import { makeStyles } from "@material-ui/core";
import Notifier from "./components/Notifier";

const useStyles = makeStyles((theme) => ({
  container: {
    top: "60px",
    [theme.breakpoints.down("sm")]: {
      "& > .MuiCollapse-container > .MuiCollapse-wrapper  > .MuiCollapse-wrapperInner": {
        width: "100%", // occupy full-width on xs screens
      },
    },
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        classes={{
          containerRoot: classes.container,
        }}
        TransitionComponent={Slide}
      >
        <Notifier />
        <Router>
          <Layout path="/" redirect="/home">
            <Logs path="/home" />
            <LogModify path="/log/add" />
            <LogModify path="/log/:id" />
            <Request path="/log/request/:id" />

            <Users path="/users" />
            <UserModify path="/users/add" />
            <UserModify path="/users/:id" />

            <MachineModify path="/machines/add" />
            <MachineModify path="/machines/:id" />

            <CategoryModify path="/category/add" />
            <CategoryModify path="/category/:id" />

            <Notifications path="/notifications" />
            <NotifyDetails path="/notify/:id" />
            <RepairDetails path="/notify/repair/:id" />
            <RequestDetails path="/notify/request/:id" />
          </Layout>
          <Login path="/login" />
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;

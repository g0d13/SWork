import React from "react";
import { Provider } from "react-redux";
import { Router } from "@reach/router";
import store from "./store";
import { SnackbarProvider } from "notistack";

import Layout from "./layout/Layout";
import Logs from "./pages/Logs";
import Users from "./pages/Users";
import Login from "./pages/Login";
import LogModify from "./pages/Log/LogModify";
import UserModify from "./pages/User/UserModify";
import Notifications from "./pages/Notifications";
import NotifyDetails from "./pages/Notify/NotifyDetails";
import Request from "./pages/Log/Request";

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Layout path="/" redirect="/home">
            <Logs path="/home" />
            <LogModify path="/log/add" />
            <LogModify path="/log/:id" />
            <Request path="/log/request/:id" />
            <Users path="/users" />
            <UserModify path="/users/add" />
            <UserModify path="/users/:id" />
            <Notifications path="/notifications" />
            <NotifyDetails path="/notify/:id" />
          </Layout>
          <Login path="/login" />
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;

import React from "react";
import { Provider } from "react-redux";
import { Router } from "@reach/router";
import store from "./store";

import Layout from "./layout/Layout";
import Logs from "./pages/Logs";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Request from "./pages/Log/Log";
import UserModify from "./pages/User/UserModify";
import Notifications from "./pages/Notifications";
import NotifyDetails from "./pages/Notify/NotifyDetails";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout path="/" redirect="/home">
          <Logs path="/home" />
          <Request path="/log/request/:id" />
          <Users path="/users" />
          <UserModify path="/users/:userId" />
          <Notifications path="/notifications" />
          <NotifyDetails path="/notify/:id" />
        </Layout>
        <Login path="/login" />
      </Router>
    </Provider>
  );
}

export default App;

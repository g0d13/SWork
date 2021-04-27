import React from "react";
import Layout from "../layout/Layout";
import Users from "../pages/Users";
import Login from "../pages/Login";
import LogUpdate from "../pages/Log/LogUpdate";
import LogCreate from "../pages/Log/LogCreate";
import UserUpdate from "../pages/User/UserUpdate";
import UserCreate from "../pages/User/UserCreate";
import Notifications from "../pages/Notifications";
import NotifyDetails from "../pages/Notify/NotifyDetails";
import RepairDetails from "../pages/Notify/RepairDetails";
import RequestDetails from "../pages/Notify/RequestDetails";
import Request from "../pages/Log/Request";
import MachineModify from "../pages/Machine/MachineModify";
import HistoryList from "../pages/History/HistoryList";
import HistoryItem from "../pages/History/HistoryItem";

import {
  CategoryUpdate,
  CategoryCreate,
} from "../pages/Category/CategoryModify";
import { Router, Redirect } from "@reach/router";
import { useAuth } from "../hooks/useAuth";
import Home from "../pages/Home";

const Routes = () => {
  const userData = useAuth("user");

  return (
    <React.Fragment>
      <Router>
        <Redirect noThrow from="/" to="/home" />

        {JSON.parse(userData) === null ? (
          <Redirect noThrow from="/home" to="/login" />
        ) : (
          <Layout path="/">
            <Redirect noThrow from="/" to="/home" />

            <Home path="/home" />
            <LogCreate path="/log/add" />
            <LogUpdate path="/log/:id" />
            <Request path="/log/request/:id" />

            <Users path="/users" />
            <UserCreate path="/user/add" />
            <UserUpdate path="/user/:id" />

            <MachineModify path="/machine/add" />
            <MachineModify path="/machine/:id" />

            <CategoryCreate path="/category/add" />
            <CategoryUpdate path="/category/:id" />

            <Notifications path="/notifications" />
            <NotifyDetails path="/notify/:id" />
            <RepairDetails path="/repair/:id" />
            <RequestDetails path="/notify/request/:id" />

            <HistoryList path="/history" />
            <HistoryItem path="/history/:id" />
          </Layout>
        )}
        <Login path="/login" />
      </Router>
    </React.Fragment>
  );
};

export default Routes;

import React from "react";
import Layout from "../layout/Layout";
import Logs from "../pages/Logs";
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
import {
  CategoryUpdate,
  CategoryCreate,
} from "../pages/Category/CategoryModify";
import { Router, Redirect } from "@reach/router";

const Routes = () => (
  <React.Fragment>
    <Router>
      <Layout path="/">
        <Redirect noThrow from="/" to="/home" />

        <Logs path="/home" />
        <LogCreate path="/log/add" />
        <LogUpdate path="/log/:id" />
        <Request path="/log/request/:id" />

        <Users path="/users" />
        <UserCreate path="/user/add" />
        <UserUpdate path="/user/:id" />

        <MachineModify path="/machines/add" />
        <MachineModify path="/machines/:id" />

        <CategoryCreate path="/category/add" />
        <CategoryUpdate path="/category/:id" />

        <Notifications path="/notifications" />
        <NotifyDetails path="/notify/:id" />
        <RepairDetails path="/notify/repair/:id" />
        <RequestDetails path="/notify/request/:id" />
      </Layout>
      <Login path="/login" />
    </Router>
  </React.Fragment>
);

export default Routes;

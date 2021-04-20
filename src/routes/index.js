import React from "react";
import Layout from "../layout/Layout";
import Logs from "../pages/Logs";
import Users from "../pages/Users";
import Login from "../pages/Login";
import LogModify from "../pages/Log/LogModify";
import UserModify from "../pages/User/UserModify";
import Notifications from "../pages/Notifications";
import NotifyDetails from "../pages/Notify/NotifyDetails";
import RepairDetails from "../pages/Notify/RepairDetails";
import RequestDetails from "../pages/Notify/RequestDetails";
import Request from "../pages/Log/Request";
import MachineModify from "../pages/Machine/MachineModify";
import CategoryModify from "../pages/Category/CategoryModify";
import { Router } from "@reach/router";

const Routes = () => (
  <React.Fragment>
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
  </React.Fragment>
);

export default Routes;

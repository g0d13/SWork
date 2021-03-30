import React from "react";
import { RecoilRoot } from "recoil";
import Layout from "./layout/Layout";
import { Router } from "@reach/router";
import Logs from "./pages/Logs";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Request from "./pages/Log/Log";

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          <Layout path="/" redirect="/home">
            <Logs path="/home" />
            <Request path="/request" />
            <Users path="/users" />
          </Layout>
          <Login path="/login" />
        </Router>
      </RecoilRoot>
    </>
  );
}

export default App;

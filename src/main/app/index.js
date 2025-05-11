import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "../libs/contexts/authContext";
import AdminContextProvider from "../libs/contexts/adminContext";
import AgentsContextProvider from "../libs/contexts/agentsContext";
import BuyersContextProvided from "../libs/contexts/buyersContext";
import Admins from "./pages/admins";
import Agents from "./pages/agents";
import Buyers from "./pages/byers";
import NotAuth from "./pages/errPages/not-auth";
import Support from "./pages/others/support";
import Settings from "./pages/admins/settings";

export default function MainApp() {
  const { user } = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/admin" component={Admins} />
      <Route path="/agents" component={Agents} />
      <Route path="/buyers" component={Buyers} />
      <Route path="/support" component={Support} />
      <Route path="/settings" component={Settings} />
      <Route path="/forbidden" component={NotAuth} />
    </Switch>
  );
}

import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
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
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  if (!authState.user) return history.push("/forbidden");
  const role = authState.user.role; 
  if (role === "Admin") {
    return (
      <AdminContextProvider>
        <Admins />
      </AdminContextProvider>
    );
  }
  if (role === "Agent") {
    return (
      <AgentsContextProvider>
        <Agents />
      </AgentsContextProvider>
    );
  }
  if (role === "Buyer") {
    return (
      <BuyersContextProvided>
        <Buyers />
      </BuyersContextProvided>
    )
  }
  
  // console.log(authState.user);
  // return (
  //   <Switch>
  //     <Route path="/admin" component={Admins} />
  //     <Route path="/agents" component={Agents} />
  //     <Route path="/buyers" component={Buyers} />
  //     <Route path="/support" component={Support} />
  //     <Route path="/settings" component={Settings} />
  //     <Route path="/forbidden" component={NotAuth} />
  //   </Switch>
  // );
}

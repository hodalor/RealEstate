import { Route, Switch } from "react-router-dom";
import AuthContextProvider from "./libs/contexts/authContext";

import Web from "./website";
import Login from "./auth/signin";
import Register from "./auth/register";
import Terms from "./auth/termsAndConditions";
import MainApp from "./app";
import NotAuth from "./app/pages/errPages/not-auth";
import Buyers from "./app/pages/byers";
import Agents from "./app/pages/agents";
import Admin from "./app/pages/admins";

export default function Main() {

  return (
    <Switch>
      <Route exact path="/" render={(props) => <Web {...props} />} />
      <AuthContextProvider>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/terms" component={Terms} />
        <Route path="/forbidden" component={NotAuth} />
        <Route path="/properties" component={Buyers} />
        <Route path="/agents" component={Agents} />
        <Route path="/admin" component={Admin} />
        <Route path="/check" component={MainApp} />
      </AuthContextProvider>
    </Switch>
  );
}

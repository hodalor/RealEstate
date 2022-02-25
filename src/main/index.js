import { Route, Switch, useHistory } from "react-router-dom";

import Web from "./website";
import Login from "./auth/signin";
import Register from "./auth/register";
import Terms from "./auth/termsAndConditions";
import MainApp from "./app";
import { useState } from "react";
import NotAuth from "./app/pages/errPages/not-auth";
import Buyers from "./app/pages/byers";
import Agents from "./app/pages/agents";
import Admin from "./app/pages/admins";

export default function Main(props) {
  // states
  const [data, setData] = useState({
    userType: "",
  });

  // create history variable
  const history = useHistory();

  const _handleLogin = async (data) => {
    // handle login here
    setData({
      ...data,
      userType: "BUYERS",
    });
    history.push("/check");
  };

  return (
    <Switch>
      <Route exact path="/" render={(props) => <Web {...props} />} />
      <Route
        path="/login"
        render={(props) => <Login {...props} onLogin={_handleLogin} />}
      />
      <Route path="/register" render={(props) => <Register {...props} />} />
      <Route path="/terms" render={(props) => <Terms {...props} />} />
      <Route path="/forbidden" render={(props) => <NotAuth {...props} />} />
      <Route path="/properties" render={(props) => <Buyers {...props} />} />
      <Route path="/agents" render={(props) => <Agents {...props} />} />
      <Route path="/admin" render={(props) => <Admin {...props} />} />
      <Route
        path="/check"
        render={(props) => <MainApp {...props} userType={data.userType} />}
      />
    </Switch>
  );
}

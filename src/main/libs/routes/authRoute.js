import { Route, Switch } from "react-router-dom";
import Web from "../../website";
import Login from "../../auth/signin";
import Register from "../../auth/register";
import Terms from "../../auth/termsAndConditions";

export default function AuthRoutes(props) {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Web {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/register" render={(props) => <Register {...props} />} />
      <Route path="/terms" render={(props) => <Terms {...props} />} />
    </Switch>
  );
}

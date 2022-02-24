import { Route, Switch } from "react-router-dom";
import Buyers from "../../app/pages/byers";
import Agents from "../../app/pages/agents";
import Admin from "../../app/pages/admins";
import MainApp from "../../app";

export default function AppRoutes(props) {
  const userType = props.userType;
  return (
    <Switch>
      <Route
        path="/check"
        render={(props) => <MainApp {...props} userType={userType} />}
      />
      <Route path="/properties" render={(props) => <Buyers {...props} />} />
      <Route path="/agents" render={(props) => <Agents {...props} />} />
      <Route path="/admin" render={(props) => <Admin {...props} />} />
    </Switch>
  );
}

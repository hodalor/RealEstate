import { Switch, Route } from "react-router-dom";
import AdminStart from "../../../components/admin";
import AdminPageTitle from "../../../components/admin/pageTitle";
import AdminContextProvider from "../../../libs/contexts/adminContext";
import AddAdmin from "./addAdmin";
import AddAgent from "./addAgent";
import AddProp from "./addProperty";
import AgentProfile from "./agentDetails";
import Agents from "./agents";
import Notifications from "./notifications";
import AdminProfile from "./profile";
import AdminProperties from "./properties";
import PropertyDetails from "./propertyDetails";
import User from "./user";
import Users from "./users";

export default function Admin() {
  return (
    <AdminContextProvider>
      <AdminStart />
      <section className="content">
        <AdminPageTitle />
        <div className="container-fluid">
          <div className="row clearfix">
            <Switch>
              <Route
                exact
                path="/admin/properties/"
                component={AdminProperties}
              />
              <Route
                path="/admin/properties/details/:ID"
                component={PropertyDetails}
              />
              <Route exact path="/admin/agents/" component={Agents} />
              <Route
                path="/admin/agents/details/:ID"
                component={AgentProfile}
              />
              <Route path="/admin/add-agent/" component={AddAgent} />
              <Route path="/admin/add-admin/" component={AddAdmin} />
              <Route path="/admin/users/" component={Users} />
              <Route path="/admin/users/user/:ID" component={User} />
              <Route path="/admin/profile/" component={AdminProfile} />
              <Route
                exact
                path="/admin/notifications"
                component={Notifications}
              />
              <Route path="/admin/create-property" component={AddProp} />
            </Switch>
          </div>
        </div>
      </section>
    </AdminContextProvider>
  );
}

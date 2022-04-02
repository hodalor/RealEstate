import { Switch, Route } from "react-router-dom";
import AgentsStart from "../../../components/agents";
import AgentsPageTitle from "../../../components/agents/pageTitle";
import AgentContextProvider from "../../../libs/contexts/agentsContext";
import AddProp from "./addProperty";
import NotiDetails from "./notiDetails";
import Notifications from "./notifications";
import AgentProfile from "./profile";
import AgentsProperties from "./properties";
import PropertyDetails from "./propertyDetails";

export default function Agents() {
  return (
    <AgentContextProvider>
      <AgentsStart />
      <section className="content">
        <AgentsPageTitle />
        <div className="container-fluid">
          <div className="row clearfix">
            <Switch>
              <Route
                exact
                path="/agents/properties/"
                component={AgentsProperties}
              />
              <Route
                path="/agents/properties/details/:ID"
                component={PropertyDetails}
              />
              <Route path="/agents/profile" component={AgentProfile} />
              <Route
                exact
                path="/agents/notifications"
                component={Notifications}
              />
              <Route
                path="/agents/notifications/details/:ID"
                component={NotiDetails}
              />
              <Route
                path="/agents/create-property"
                component={AddProp}
              />
            </Switch>
          </div>
        </div>
      </section>
    </AgentContextProvider>
  );
}

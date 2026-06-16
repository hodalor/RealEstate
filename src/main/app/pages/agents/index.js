import { Switch, Route, Redirect } from "react-router-dom";
import AgentsStart from "../../../components/agents";
import AgentsPageTitle from "../../../components/agents/pageTitle";
import AgentContextProvider from "../../../libs/contexts/agentsContext";
import AddProp from "./addProperty";
import AgentDashboard from "./dashboard";
import NotiDetails from "./notiDetails";
import Notifications from "./notifications";
import AgentProfile from "./profile";
import AgentsProperties from "./properties";
import PropertyDetails from "./propertyDetails";
import LiveChat from "./liveChat";
import TourBookings from "./tourBookings";
import PaymentHistory from "./paymentHistory";
import { AuthContext } from "../../../libs/contexts/authContext";
import { useContext } from "react";

export default function Agents() {
  const { authState } = useContext(AuthContext);
  const userRole = authState.user?.role;

  if (!userRole) {
    return <Redirect to="/login" />;
  }

  if (userRole !== "Agent") {
    return <Redirect to="/login" />;
  }

  return (
    <AgentContextProvider>
      <AgentsStart />
      <section className="content">
        <AgentsPageTitle />
        <div className="container-fluid">
          <div className="row clearfix">
            <Switch>
              <Route exact path="/agents">
                <Redirect to="/agents/dashboard/" />
              </Route>
              <Route exact path="/agents/dashboard/" component={AgentDashboard} />
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
              <Route
                path="/agents/live-chat"
                component={LiveChat}
              />
              <Route
                path="/agents/tour-bookings"
                component={TourBookings}
              />
              <Route
                path="/agents/payment-history"
                component={PaymentHistory}
              />
              <Route path="*">
                <Redirect to="/agents/dashboard/" />
              </Route>
            </Switch>
          </div>
        </div>
      </section>
    </AgentContextProvider>
  );
}

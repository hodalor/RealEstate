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
import LiveChat from "./liveChat";
import TourBookings from "./tourBookings";
import PaymentHistory from "./paymentHistory";
import { AuthContext } from "../../../libs/contexts/authContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Agents() {
  const history = useHistory()
  const { authState } = useContext(AuthContext);
  if (authState.user && authState.user.role !== "Agent") return history.push("/login") 
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
            </Switch>
          </div>
        </div>
      </section>
    </AgentContextProvider>
  );
}

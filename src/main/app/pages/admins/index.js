import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthContext } from "../../../libs/contexts/authContext";
import AdminContextProvider from "../../../libs/contexts/adminContext";
import AdminStart from "../../../components/admin";
import AdminPageTitle from "../../../components/admin/pageTitle";
import AdminProperties from "./properties";
import AddAdmin from "./addAdmin";
import AddAgent from "./addAgent";
import AddProp from "./addProperty";
import AgentDetails from "./agentDetails";
import Agents from "./agents";
import Notifications from "./notifications";
import Profile from "./profile";
import PropertyDetails from "./propertyDetails";
import User from "./user";
import Users from "./users";
import Settings from "./settings";
import AdminChats from "./chats";
import TourBookings from "./tourBookings";
import PaymentHistory from "./payments";

export default function Admin() {
  const { authState } = useContext(AuthContext);
  const userRole = authState.user?.role;

  if (!userRole) {
    return <Redirect to="/login" />;
  }

  if (userRole !== "Admin") {
    return <Redirect to="/login" />;
  }

  return (
    <AdminContextProvider>
      <AdminStart />
      <section className="content">
        <AdminPageTitle />
        <div className="container-fluid">
          <div className="row clearfix">
            <Switch>
              <Route exact path="/admin">
                <Redirect to="/admin/properties/" />
              </Route>
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
                component={AgentDetails}
              />
              <Route path="/admin/add-agent/" component={AddAgent} />
              <Route path="/admin/add-admin/" component={AddAdmin} />
              <Route path="/admin/users/" component={Users} />
              <Route path="/admin/users/user/:ID" component={User} />
              <Route path="/admin/profile/" component={Profile} />
              <Route
                exact
                path="/admin/notifications"
                component={Notifications}
              />
              <Route path="/admin/settings" component={Settings} />
              <Route path="/admin/create-property" component={AddProp} />
              <Route path="/admin/chats" component={AdminChats} />
              <Route path="/admin/tour-bookings" component={TourBookings} />
              <Route path="/admin/payments" component={PaymentHistory} />
              <Route path="*">
                <Redirect to="/admin/properties/" />
              </Route>
            </Switch>
          </div>
        </div>
      </section>
    </AdminContextProvider>
  );
}

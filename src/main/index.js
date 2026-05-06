import { Route, Switch } from "react-router-dom";
import AuthContextProvider from "./libs/contexts/authContext";

import NewLandingPage from "./website/NewLandingPage";
import PropertyDetail from "./website/PropertyDetail";
import Login from "./auth/signin";
import Register from "./auth/register";
import Terms from "./auth/termsAndConditions";
import MainApp from "./app";
import NotAuth from "./app/pages/errPages/not-auth";
import Buyers from "./app/pages/byers";
import Agents from "./app/pages/agents";
import Admin from "./app/pages/admins";
import Support from "./app/pages/others/support";
import ToastProvider from "./components/toastProvider";
import PublicProperties from "./website/PublicProperties";

// Import custom styles
import "./website/styles/custom.css";
import "./website/styles/header-fix.css";
import "./app/styles/internal-forms.css";


export default function Main() {
  return (
    <ToastProvider>
      <Switch>
        <Route exact path="/" component={NewLandingPage} />
        <Route exact path="/property-listing" component={PublicProperties} />
        <Route exact path="/properties/:id" component={PropertyDetail} />
        <AuthContextProvider>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/terms" component={Terms} />
          <Route path="/forbidden" component={NotAuth} />
          {/* <Route path="/properties/:id" component={PropertyDetail} /> */}
          <Route exact path="/properties" component={Buyers} />
          <Route path="/agents" component={Agents} />
          <Route path="/admin" component={Admin} />
          <Route path="/check" component={MainApp} />
          <Route path="/support" component={Support} />
        </AuthContextProvider>
      </Switch>
    </ToastProvider>
  );
}

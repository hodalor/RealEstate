import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import BuyersStart from "../../../components/buyers";
import PageTitle from "../../../components/buyers/pagetTitle";
import BuyersContextProvided from "../../../libs/contexts/buyersContext";
import AgentDetails from "./agentDetils";
import Agents from "./agents";
import Favorites from "./favorites";
import Properties from "./properties";
import ItemDetails from "./propertyDetails";
import Profile from "./userProfile";

export default function Buyers(props) {
  return (
    <div>
      <BuyersContextProvided>
        <BuyersStart />
        <section className="content">
          <PageTitle />
          <div className="container-fluid">
            <div className="row clearfix">
              <Switch>
                <Route exact path="/properties/listings" component={Properties} />
                <Route exact path="/properties/agents" component={Agents} />
                <Route path="/properties/favorites" component={Favorites} />
                <Route path="/properties/profile" component={Profile} />
                <Route
                  path="/properties/agent/details/:agentID"
                  component={AgentDetails}
                />
                <Route
                  path="/properties/listings/details/:itemID"
                  component={ItemDetails}
                />
              </Switch>
            </div>
          </div>
        </section>
      </BuyersContextProvided>
    </div>
  );
}

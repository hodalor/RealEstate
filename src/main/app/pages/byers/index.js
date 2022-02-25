import { Switch, Route } from "react-router-dom";
import TopBar from "../../../components/topBar";
import Properties from "./properties";

export default function Buyers(props) {
  return (
    <div>
      <TopBar />
    </div>
    // <Switch>
    //   <Route
    //     path="/properties/property-listing"
    //     render={(props) => <Properties {...props} />}
    //   />
    // </Switch>
  );
}

import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../libs/contexts/authContext";

export default function MainApp() {
  const {authState} = useContext(AuthContext)
  // get role from props
  const userType = authState.userType

  // show page based on user type
  if (userType === "" || userType === undefined) {
    return <Redirect to="/forbidden" />;
  } else if (userType === "BUYERS") {
    return <Redirect to="/properties" />;
  } else if (userType === "AGENT") {
    return <Redirect to="/agents" />;
  } else if (userType === "ADMIN") {
    return <Redirect to="/admin" />;
  }
}

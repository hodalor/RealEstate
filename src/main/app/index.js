import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../libs/contexts/authContext";

export default function MainApp() {
  const { authState } = useContext(AuthContext);
  // get role from props
  const userType = authState.user.role;

  // show page based on user type
  if (userType === "" || userType === undefined) {
    return <Redirect to="/forbidden" />;
  } else if (userType === "Buyer") {
    return <Redirect to="/properties" />;
  } else if (userType === "Agent") {
    return <Redirect to="/agents" />;
  } else if (userType === "Admin") {
    return <Redirect to="/admin" />;
  }
}

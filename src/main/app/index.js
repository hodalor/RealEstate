import { Redirect } from "react-router-dom";

export default function MainApp(props) {
  // get role from props
  const userType = props.userType || props.history.location.userType;
  console.log(userType);

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

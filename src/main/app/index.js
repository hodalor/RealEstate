import { Redirect } from "react-router-dom";

export default function MainApp(props) {
  // get role from props
  const userType = props.userType;
  console.log(userType);
  
  // show page based on user type
  if (userType === "") {
    return <Redirect to="/forbidden" />;
  } else if (userType === "BUYERS") {
    return <Redirect to="/properties" />;
  } else if (userType === "AGENT") {
    return <Redirect to="/angents" />;
  } else if (userType === "ADMIN") {
    return <Redirect to="/admin" />;
  }
}

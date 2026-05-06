import React, { useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { AuthContext } from "../libs/contexts/authContext";

export default function MainApp() {
  const location = useLocation();
  const { authState } = useContext(AuthContext);
  const role = authState.user?.role;

  if (!role) {
    return <Redirect to="/login" />;
  }

  const routeMap = {
    Admin: "/admin/properties/",
    Agent: "/agents/properties/",
    Buyer: "/properties/listings",
  };

  const targetRoute = routeMap[role];

  if (!targetRoute) {
    return <Redirect to="/forbidden" />;
  }

  if (location.pathname === targetRoute) {
    return null;
  }

  return <Redirect to={targetRoute} />;
}

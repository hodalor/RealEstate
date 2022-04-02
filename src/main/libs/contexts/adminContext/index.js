import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const AdminContext = createContext();

export default function AdminContextProvider(props) {
  const history = useHistory();

  const [adminData, setAdminData] = useState({});

  const _routeToDetails = (data) => {
    history.push("/admin/properties/details/" + data);
  };

  const _routeToAgents = (data) => {
    history.push("/admin/agents/details/" + data);
  };

  return (
    <AdminContext.Provider
      value={{ adminData, _routeToDetails, _routeToAgents }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}

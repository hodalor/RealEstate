import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const BuyersContext = createContext();

export default function BuyersContextProvided(props) {
  const history = useHistory();

  const [buyerState, setBuyerState] = useState({
    title: "buyer",
    loading: false,
  });

  const _navigateToDetails = (id) => {
    return history.push("/properties/listings/details/" + id);
  };

  const _routeToAgents = (data) => {
    return history.push("/properties/agent/details/" + 1);
  };

  const _navigateToAgents = () => {
    history.push("/properties/agents");
    window.location.reload();
  };

  return (
    <BuyersContext.Provider
      value={{
        buyerState,
        _navigateToDetails,
        _routeToAgents,
        _navigateToAgents,
      }}
    >
      {props.children}
    </BuyersContext.Provider>
  );
}

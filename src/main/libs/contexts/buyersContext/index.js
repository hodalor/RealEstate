import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const BuyersContext = createContext();

export default function BuyersContextProvided(props) {
  const history = useHistory();

  const [buyerState, setBuyerState] = useState({
    title: "buyer",
    loading: false
  });

  const _navigateToDetails = (id) => {
    history.push("/properties/listings/details/" + id);
  };

  return (
    <BuyersContext.Provider value={{ buyerState, _navigateToDetails }}>
      {props.children}
    </BuyersContext.Provider>
  );
}

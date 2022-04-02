import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const AgentsContext = createContext();

export default function AgentContextProvider(props) {
  const [agentState, setAgentState] = useState({
    isReply: false,
  });

  const history = useHistory();

  const _routeToDetails = (id) => {
    history.push("/agents/properties/details/" + id);
  };

  const _routeToNotification = (id) => {
    history.push("/agents/notifications/details/" + id);
  };

  const _triggerReply = (check) => {
    if (check === "cancel")
      return setAgentState({
        ...agentState,
        isReply: false,
      });

    if (check === "reply")
      return setAgentState({
        ...agentState,
        isReply: true,
      });
  };

  const _routeToAdd = () => {
    history.push("/agents/create-property");
  };

  return (
    <AgentsContext.Provider
      value={{
        agentState,
        _routeToDetails,
        _routeToNotification,
        _triggerReply,
        _routeToAdd,
      }}
    >
      {props.children}
    </AgentsContext.Provider>
  );
}

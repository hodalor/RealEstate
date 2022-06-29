import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { _sendRequest } from "../../functions/creates";
import { _calcDays } from "../../functions/dateDiff";
import { _editAgent, _editPass } from "../../functions/edits";
import { _fetchAgents, _fetchProperties } from "../../functions/fetches";
import { _retrieveFromStroage, _saveToStorage } from "../../functions/storage";
import { _validatePass } from "../../functions/validations";
import { AuthContext } from "../authContext";

export const BuyersContext = createContext();

export default function BuyersContextProvided(props) {
  const { notiData, setNotiData, setLoading } = useContext(AuthContext);
  const history = useHistory();

  const [buyerState, setBuyerState] = useState({
    user: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      con_pass: "",
      new_pass: "",
      image: {},
      isBlocked: false,
    },
    propertyDetails: {},
    properties: [],
    buyer: {},
    agents: [],
    agent: {},
  });

  useEffect(() => {
    _getData();
  }, []);

  const _getData = async () => {
    var userData = await _retrieveFromStroage("user");
    setBuyerState({
      ...buyerState,
      buyer: userData,
    });

    setLoading(true);
    const results = await _fetchProperties();
    const agents = await _fetchAgents();

    if (results.success !== 0) {
      results.data.sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }

    var properts = [];
    if (results.success !== 0) {
      await results.data.forEach((property) => {
        if (property.isApproved) properts.push(property);
      });
    }

    setLoading(false);
    setBuyerState({
      ...buyerState,
      properties: properts,
      buyer: userData,
      agents: agents !== undefined && agents.success === 1 ? agents.data : [],
    });
  };

  const _navigateToDetails = async (data) => {
    const store = await _saveToStorage({ data, key: "property" });
    const agnt = await buyerState.agents.find(
      (agent) => agent._id === data.agentID
    );

    const days = await _calcDays(agnt.createdAt);

    agnt.days = days;

    data.agent = agnt;
    if (store) {
      setBuyerState({
        ...buyerState,
        propertyDetails: data,
      });
      return history.push("/properties/listings/details/" + data._id);
    }
  };

  const _routeToAgents = async (data) => {
    const store = await _saveToStorage({ data, key: "agent" });
    const days = await _calcDays(data.createdAt);
    data.days = days;

    if (store) {
      setBuyerState({
        ...buyerState,
        agent: data,
      });
      return history.push("/properties/agent/details/" + data._id);
    }
  };

  const _navigateToAgents = () => {
    history.push("/properties/agents");
    // window.location.reload();
  };

  const _handleChange = (data) => {
    const { field, value } = data;

    if (field === "firstName")
      return setBuyerState({
        ...buyerState,
        user: {
          ...buyerState.user,
          firstName: value,
        },
      });

    if (field === "lastName")
      return setBuyerState({
        ...buyerState,
        user: {
          ...buyerState.user,
          lastName: value,
        },
      });

    if (field === "phone")
      return setBuyerState({
        ...buyerState,
        user: {
          ...buyerState.user,
          phone: value,
        },
      });

    if (field === "email")
      return setBuyerState({
        ...buyerState,
        user: {
          ...buyerState.user,
          email: value,
        },
      });

    if (field === "password")
      return setBuyerState({
        ...buyerState,
        user: {
          ...buyerState.user,
          password: value,
        },
      });

    if (field === "con_pass")
      return setBuyerState({
        ...buyerState,
        user: {
          ...buyerState.user,
          con_pass: value,
        },
      });

    if (field === "new_pass")
      return setBuyerState({
        ...buyerState,
        user: {
          ...buyerState.user,
          new_pass: value,
        },
      });

    if (field === "image")
      return setBuyerState({
        ...buyerState,
        user: {
          ...buyerState.user,
          image: value.file,
        },
      });
  };

  const _changePass = async () => {
    const validate = await _validatePass(buyerState.user);

    if (!validate.status)
      return setNotiData({
        ...notiData,
        type: "warning",
        msg: validate.mesg,
        show: true,
      });

    setLoading(true);

    const res = await _editPass({
      data: buyerState,
      key: "buyer",
      admin: null,
    });

    if (res === undefined || res.success === 0) {
      setLoading(false);
      setNotiData({
        ...notiData,
        type: "error",
        msg: res.message,
        show: true,
      });

      return;
    }

    setLoading(false);

    setNotiData({
      ...notiData,
      type: "info",
      msg: "Password updated successfully!",
      show: true,
    });
  };

  const _saveChanges = async () => {
    setLoading(true);

    const results = await _editAgent({
      fields: buyerState.user,
      buyer: buyerState.buyer,
      agent: null,
      key: "buyer",
      admin: null,
    });

    if (results === undefined || results.success === 0) {
      setLoading(false);
      setNotiData({
        ...notiData,
        type: "error",
        msg: results.message,
        show: true,
      });

      return;
    }

    setNotiData({
      ...notiData,
      type: "info",
      msg: "Agent data updated successfully!",
      show: true,
    });
  };

  const _send = async (data) => {
    setLoading(true);
    const results = await _sendRequest({ data, buyer: buyerState.buyer });
    if (results === undefined || results.success === 0) {
      setLoading(false);
      setNotiData({
        ...notiData,
        type: "error",
        msg: results.message,
        show: true,
      });

      return;
    }

    setLoading(false);

    setNotiData({
      ...notiData,
      type: "info",
      msg: "Request submitted successfully!",
      show: true,
    });
  };

  return (
    <BuyersContext.Provider
      value={{
        buyerState,
        _navigateToDetails,
        _routeToAgents,
        _navigateToAgents,
        _changePass,
        _saveChanges,
        _handleChange,
        _send,
      }}
    >
      {props.children}
    </BuyersContext.Provider>
  );
}

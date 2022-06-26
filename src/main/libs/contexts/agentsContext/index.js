import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { _addProperty } from "../../functions/creates";
import { _calcDays } from "../../functions/dateDiff";
import { _editAgent, _editPass } from "../../functions/edits";
import { _fetchProperties } from "../../functions/fetches";
import { _retrieveFromStroage, _saveToStorage } from "../../functions/storage";
import { _validatePass, _validateProp } from "../../functions/validations";
import { AuthContext } from "../authContext";

export const AgentsContext = createContext();

export default function AgentContextProvider(props) {
  const { notiData, setNotiData, setLoading } = useContext(AuthContext);

  const [agentState, setAgentState] = useState({
    user: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      address: "",
      con_pass: "",
      new_pass: "",
      image: {},
      dob: "",
      ghcard: "",
      gr1Name: "",
      gr1Contact: "",
      rel1: "",
      gr2Name: "",
      gr2Contact: "",
      rel2: "",
      gender: "",
      fb: "",
      tw: "",
      ins: "",
      isBlocked: false,
    },
    property: {
      propName: "",
      propLoca: "",
      propType: "",
      propDesc: "",
      rentOrSale: "",
      price: Number,
      bedRoomNumber: Number,
      bathRoomNumber: Number,
      sqft: Number,
      carPark: Boolean,
      year: "",
      agentID: "",
      address: "",
      dRoom: Boolean,
      kitchen: Boolean,
      livRoom: Boolean,
      mBedroom: Boolean,
      porch: Boolean,
      stRoom: Boolean,
      pool: Boolean,
      ppWater: Boolean,
      acon: Boolean,
      elct: Boolean,
      nmRoad: Boolean,
      nsMarket: Boolean,
      pets: Boolean,
      rooms: Number,
      propImages: [],
    },
    propertyDetails: {},
    properties: [],
    isReply: false,
    agent: {},
  });

  useEffect(() => {
    _getData();
  }, []);

  const history = useHistory();

  const _getData = async () => {
    var userData = await _retrieveFromStroage("user");
    const days = await _calcDays(userData.createdAt);

    userData.days = days;
    setLoading(true);
    const results = await _fetchProperties();

    var properties = [];
    await results.data.forEach((property) => {
      if (property.agentID === userData._id) {
        properties.push(property);
      }
    });

    properties.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    setLoading(false);
    setAgentState({
      ...agentState,
      properties:
        results !== undefined && results.success === 1 ? properties : [],
      agent: userData,
    });
  };

  const _routeToDetails = async (data) => {
    const store = await _saveToStorage({ data, key: "property" });

    if (store) {
      setAgentState({
        ...agentState,
        propertyDetails: data,
      });
      history.push("/agents/properties/details/" + data._id);
    }
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

  const _handleChange = (data) => {
    const { field, value } = data;

    if (field === "firstName")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          firstName: value,
        },
      });

    if (field === "lastName")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          lastName: value,
        },
      });

    if (field === "phone")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          phone: value,
        },
      });

    if (field === "email")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          email: value,
        },
      });

    if (field === "password")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          password: value,
        },
      });

    if (field === "con_pass")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          con_pass: value,
        },
      });

    if (field === "new_pass")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          new_pass: value,
        },
      });

    if (field === "address")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          address: value,
        },
      });

    if (field === "image")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          image: value.file,
        },
      });

    if (field === "dob")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          dob: value,
        },
      });

    if (field === "ghcard")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          ghcard: value,
        },
      });

    if (field === "gr1Name")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          gr1Name: value,
        },
      });

    if (field === "gr1Contact")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          gr1Contact: value,
        },
      });

    if (field === "rel1")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          rel1: value,
        },
      });

    if (field === "gr2Name")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          gr2Name: value,
        },
      });

    if (field === "gr2Contact")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          gr2Contact: value,
        },
      });

    if (field === "rel2")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          rel2: value,
        },
      });

    if (field === "gender")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          gender: value,
        },
      });

    if (field === "fb")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          fb: value,
        },
      });

    if (field === "tw")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          tw: value,
        },
      });

    if (field === "ins")
      return setAgentState({
        ...agentState,
        user: {
          ...agentState.user,
          ins: value,
        },
      });

    if (field === "propName")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          propName: value,
        },
      });

    if (field === "propLoca")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          propLoca: value,
        },
      });

    if (field === "propType")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          propType: value,
        },
      });

    if (field === "propDesc")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          propDesc: value,
        },
      });

    if (field === "rentOrSale")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          rentOrSale: value,
        },
      });

    if (field === "price")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          price: value,
        },
      });

    if (field === "bedRooms")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          bedRoomNumber: value,
        },
      });

    if (field === "bathRooms")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          bathRoomNumber: value,
        },
      });

    if (field === "sqft")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          sqft: value,
        },
      });

    if (field === "carPark")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          carPark: value,
        },
      });

    if (field === "year")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          year: value,
        },
      });

    if (field === "agentID")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          agentID: value,
        },
      });

    if (field === "paddress")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          address: value,
        },
      });

    if (field === "dRoom")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          dRoom: value,
        },
      });

    if (field === "kitchen")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          kitchen: value,
        },
      });

    if (field === "livRoom")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          livRoom: value,
        },
      });

    if (field === "mBedroom")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          mBedroom: value,
        },
      });

    if (field === "porch")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          porch: value,
        },
      });

    if (field === "stRoom")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          stRoom: value,
        },
      });

    if (field === "pool")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          pool: value,
        },
      });

    if (field === "ppWater")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          ppWater: value,
        },
      });

    if (field === "acon")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          acon: value,
        },
      });

    if (field === "elct")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          elct: value,
        },
      });

    if (field === "nmRoad")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          nmRoad: value,
        },
      });

    if (field === "nsMarket")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          nsMarket: value,
        },
      });

    if (field === "pets")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          pets: value,
        },
      });

    if (field === "image_1")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          propImages: [...agentState.property.propImages, value.file],
        },
      });

    if (field === "image_2")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          propImages: [...agentState.property.propImages, value.file],
        },
      });

    if (field === "image_3")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          propImages: [...agentState.property.propImages, value.file],
        },
      });

    if (field === "image_4")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          propImages: [...agentState.property.propImages, value.file],
        },
      });

    if (field === "image_5")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          propImages: [...agentState.property.propImages, value.file],
        },
      });

    if (field === "rooms")
      return setAgentState({
        ...agentState,
        property: {
          ...agentState.property,
          rooms: value,
        },
      });
  };

  const _cancelAdd = () => {
    setAgentState({
      ...agentState,
      property: {
        ...agentState.property,
        propName: "",
        propLoca: "",
        propType: "",
        propDesc: "",
        rentOrSale: "",
        price: Number,
        bedRoomNumber: Number,
        bathRoomNumber: Number,
        sqft: Number,
        carPark: Boolean,
        year: "",
        agentID: "",
        address: "",
        dRoom: Boolean,
        kitchen: Boolean,
        livRoom: Boolean,
        mBedroom: Boolean,
        porch: Boolean,
        stRoom: Boolean,
        pool: Boolean,
        ppWater: Boolean,
        acon: Boolean,
        elct: Boolean,
        nmRoad: Boolean,
        nsMarket: Boolean,
        pets: Boolean,
        rooms: Number,
        propImages: [],
      },
    });
  };

  const _changePass = async () => {
    const validate = await _validatePass(agentState.user);

    if (!validate.status)
      return setNotiData({
        ...notiData,
        type: "warning",
        msg: validate.mesg,
        show: true,
      });

    setLoading(true);

    const res = await _editPass({
      data: agentState,
      key: "agent",
      admin: null,
    });

    _cancelAdd();
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
      fields: agentState.user,
      agent: agentState.agent,
      key: "agent",
      admin: null,
    });

    _cancelAdd();
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

  const _createProperty = async () => {
    setAgentState({
      ...agentState,
      property: {
        ...agentState.property,
        agentID: agentState.agent._id,
      },
    });

    const validate = await _validateProp(agentState.property);

    if (!validate.status)
      return setNotiData({
        ...notiData,
        type: "error",
        msg: validate.mesg,
        show: true,
      });

    setLoading(true);

    const results = await _addProperty(agentState.property);

    _cancelAdd();
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

    const getData = await _fetchProperties();

    setLoading(false);
    if (getData === undefined || getData.success === 0) {
      setNotiData({
        ...notiData,
        type: "warning",
        msg: getData.message,
        show: true,
      });

      setAgentState({
        ...agentState,
        properties: [],
      });

      return;
    }

    setAgentState({
      ...agentState,
      properties: getData.data,
    });

    setNotiData({
      ...notiData,
      type: "info",
      msg: "Property added successfully!",
      show: true,
    });
  };

  const _removeProp = async (id) => {};

  const _sold = async (id) => {};

  return (
    <AgentsContext.Provider
      value={{
        agentState,
        _routeToDetails,
        _routeToNotification,
        _triggerReply,
        _routeToAdd,
        _handleChange,
        _createProperty,
        _changePass,
        _cancelAdd,
        _saveChanges,
        _removeProp,
        _sold,
      }}
    >
      {props.children}
    </AgentsContext.Provider>
  );
}

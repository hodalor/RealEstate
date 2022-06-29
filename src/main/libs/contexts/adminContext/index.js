import React, { createContext, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../authContext";
import {
  _validateAdmin,
  _validateAgent,
  _validatePass,
  _validateProp,
} from "../../functions/validations";
import { _addAgent, _addProperty, _createAdmin } from "../../functions/creates";
import {
  _fetchAgents,
  _fetchAll,
  _fetchProperties,
} from "../../functions/fetches";
import { _calcDays } from "../../functions/dateDiff";
import {
  _approveProperty,
  _blockAgnt,
  _editAgent,
  _editPass,
  _unblockAgnt,
} from "../../functions/edits";
import { _delAgent } from "../../functions/deletes";
import { _retrieveFromStroage, _saveToStorage } from "../../functions/storage";

export const AdminContext = createContext();

export default function AdminContextProvider(props) {
  const history = useHistory();

  const { notiData, setNotiData, setLoading } = useContext(AuthContext);

  const [adminData, setAdminData] = useState({
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
    categories: {
      all: true,
      singleRooms: false,
      appartments: false,
      offices: false,
      shops: false,
      fullHouse: false,
    },
    agents: [],
    properties: [],
    pending: [],
    customers: [],
    agent: {},
    propertyDetails: {},
    customer: {},
    admin: {},
  });

  const _resetDetails = async (key) => {
    const data = await _retrieveFromStroage(key);

    if (key === "property")
      return setAdminData({
        ...adminData,
        propertyDetails: data,
      });

    if (key === "agent")
      return setAdminData({
        ...adminData,
        agent: data,
      });

    if (key === "customer")
      return setAdminData({
        ...adminData,
        customer: data,
      });
  };

  const _routeToDetails = async (data) => {
    const store = await _saveToStorage({ data, key: "property" });

    if (store) {
      setAdminData({
        ...adminData,
        propertyDetails: data,
      });
      history.push("/admin/properties/details/" + data._id);
    }
  };

  const _routeToAgents = async (data) => {
    const res = await _calcDays(data.createdAt);
    data.days = res;

    const store = await _saveToStorage({ data, key: "agent" });

    if (store) {
      setAdminData({
        ...adminData,
        agent: data,
      });
      history.push("/admin/agents/details/" + data._id);
    }
  };

  const _routeToUsers = async (data) => {
    const store = await _saveToStorage({ data, key: "custo" });

    if (store) {
      setAdminData({
        ...adminData,
        customer: data,
      });
      history.push("/admin/users/user/" + data._id);
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);

  const getAdminData = async () => {
    const userData = await _retrieveFromStroage("user");
    setAdminData({
      ...adminData,
      admin: userData,
    });

    setLoading(true);
    const results = await _fetchAll();

    setLoading(false);
    if (results !== undefined) {
      const agentsData = results[0];
      const propData = results[1];
      const custData = results[2];

      var pend = [];
      var ps = [];
      if (propData.success !== 0) {
        propData.data.forEach((pro) => {
          if (pro.isApproved) ps.push(pro);
          if (!pro.isApproved) pend.push(pro);
        });
      }

      if (agentsData.success === 1) {
        setAdminData({
          ...adminData,
          agents: agentsData.data,
          properties: ps,
          pending: pend,
          customers: custData.success === 1 ? custData.data : [],
          admin: userData,
        });
      }
    }
  };

  const _handleChange = (data) => {
    const { field, value } = data;

    if (field === "firstName")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          firstName: value,
        },
      });

    if (field === "lastName")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          lastName: value,
        },
      });

    if (field === "phone")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          phone: value,
        },
      });

    if (field === "email")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          email: value,
        },
      });

    if (field === "password")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          password: value,
        },
      });

    if (field === "con_pass")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          con_pass: value,
        },
      });

    if (field === "new_pass")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          new_pass: value,
        },
      });

    if (field === "address")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          address: value,
        },
      });

    if (field === "image")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          image: value.file,
        },
      });

    if (field === "dob")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          dob: value,
        },
      });

    if (field === "ghcard")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          ghcard: value,
        },
      });

    if (field === "gr1Name")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          gr1Name: value,
        },
      });

    if (field === "gr1Contact")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          gr1Contact: value,
        },
      });

    if (field === "rel1")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          rel1: value,
        },
      });

    if (field === "gr2Name")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          gr2Name: value,
        },
      });

    if (field === "gr2Contact")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          gr2Contact: value,
        },
      });

    if (field === "rel2")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          rel2: value,
        },
      });

    if (field === "gender")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          gender: value,
        },
      });

    if (field === "fb")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          fb: value,
        },
      });

    if (field === "tw")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          tw: value,
        },
      });

    if (field === "ins")
      return setAdminData({
        ...adminData,
        user: {
          ...adminData.user,
          ins: value,
        },
      });

    if (field === "propName")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propName: value,
        },
      });

    if (field === "propLoca")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propLoca: value,
        },
      });

    if (field === "propType")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propType: value,
        },
      });

    if (field === "propDesc")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propDesc: value,
        },
      });

    if (field === "rentOrSale")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          rentOrSale: value,
        },
      });

    if (field === "price")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          price: value,
        },
      });

    if (field === "bedRooms")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          bedRoomNumber: value,
        },
      });

    if (field === "bathRooms")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          bathRoomNumber: value,
        },
      });

    if (field === "sqft")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          sqft: value,
        },
      });

    if (field === "carPark")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          carPark: value,
        },
      });

    if (field === "year")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          year: value,
        },
      });

    if (field === "agentID")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          agentID: value,
        },
      });

    if (field === "paddress")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          address: value,
        },
      });

    if (field === "dRoom")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          dRoom: value,
        },
      });

    if (field === "kitchen")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          kitchen: value,
        },
      });

    if (field === "livRoom")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          livRoom: value,
        },
      });

    if (field === "mBedroom")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          mBedroom: value,
        },
      });

    if (field === "porch")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          porch: value,
        },
      });

    if (field === "stRoom")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          stRoom: value,
        },
      });

    if (field === "pool")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          pool: value,
        },
      });

    if (field === "ppWater")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          ppWater: value,
        },
      });

    if (field === "acon")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          acon: value,
        },
      });

    if (field === "elct")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          elct: value,
        },
      });

    if (field === "nmRoad")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          nmRoad: value,
        },
      });

    if (field === "nsMarket")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          nsMarket: value,
        },
      });

    if (field === "pets")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          pets: value,
        },
      });

    if (field === "image_1")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propImages: [...adminData.property.propImages, value.file],
        },
      });

    if (field === "image_2")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propImages: [...adminData.property.propImages, value.file],
        },
      });

    if (field === "image_3")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propImages: [...adminData.property.propImages, value.file],
        },
      });

    if (field === "image_4")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propImages: [...adminData.property.propImages, value.file],
        },
      });

    if (field === "image_5")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          propImages: [...adminData.property.propImages, value.file],
        },
      });

    if (field === "rooms")
      return setAdminData({
        ...adminData,
        property: {
          ...adminData.property,
          rooms: value,
        },
      });
  };

  const _cancelAdd = () => {
    setAdminData({
      ...adminData,
      user: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        address: "",
        con_pass: "",
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
    });
  };

  const _submit = async () => {
    const validate = await _validateAdmin(adminData.user);

    if (validate.status === false)
      return setNotiData({
        ...notiData,
        type: "warning",
        msg: validate.mesg,
        show: true,
      });

    setLoading(true);

    const results = await _createAdmin(adminData.user);

    _cancelAdd();
    setLoading(false);
    if (results === undefined || results.success === 0)
      return setNotiData({
        ...notiData,
        type: "error",
        msg: results.message,
        show: true,
      });

    setNotiData({
      ...notiData,
      type: "info",
      msg: results.message,
      show: true,
    });
  };

  const _createAgent = async () => {
    const validate = await _validateAgent(adminData.user);

    if (validate.status === false)
      return setNotiData({
        ...notiData,
        type: "warning",
        msg: validate.mesg,
        show: true,
      });

    setLoading(true);

    const results = await _addAgent(adminData.user);

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

    const getData = await _fetchAgents();

    setLoading(false);
    if (getData === undefined || getData.success === 0) {
      setNotiData({
        ...notiData,
        type: "warning",
        msg: getData.message,
        show: true,
      });

      setAdminData({
        ...adminData,
        agents: [],
      });

      return;
    }

    setAdminData({
      ...adminData,
      agents: getData.data,
    });

    setNotiData({
      ...notiData,
      type: "info",
      msg: "Agent created successfully!",
      show: true,
    });
  };

  const _changePass = async (key) => {
    const validate = await _validatePass(adminData.user);

    if (!validate.status)
      return setNotiData({
        ...notiData,
        type: "warning",
        msg: validate.mesg,
        show: true,
      });

    setLoading(true);

    const res = await _editPass({
      data: adminData,
      key,
      admin: adminData.admin,
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

    const getData = await _fetchAgents();

    setLoading(false);
    if (getData === undefined || getData.success === 0) {
      setNotiData({
        ...notiData,
        type: "warning",
        msg: getData.message,
        show: true,
      });

      setAdminData({
        ...adminData,
        agents: [],
      });

      return;
    }

    setAdminData({
      ...adminData,
      agents: getData.data,
    });

    setNotiData({
      ...notiData,
      type: "info",
      msg: "Password updated successfully!",
      show: true,
    });
  };

  const _saveChanges = async (key) => {
    setLoading(true);

    const results = await _editAgent({
      fields: adminData.user,
      agent: adminData.agent,
      key,
      admin: adminData.admin,
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

    const getData = await _fetchAgents();

    setLoading(false);
    if (getData === undefined || getData.success === 0) {
      setNotiData({
        ...notiData,
        type: "warning",
        msg: getData.message,
        show: true,
      });

      setAdminData({
        ...adminData,
        agents: [],
      });

      return;
    }

    setAdminData({
      ...adminData,
      agents: getData.data,
    });

    setNotiData({
      ...notiData,
      type: "info",
      msg: "Agent data updated successfully!",
      show: true,
    });
  };

  const _blockAgent = async () => {
    setLoading(true);
    const results = await _blockAgnt({
      fields: adminData.user,
      agent: adminData.agent,
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

    const getData = await _fetchAgents();

    setLoading(false);
    if (getData === undefined || getData.success === 0) {
      setNotiData({
        ...notiData,
        type: "warning",
        msg: getData.message,
        show: true,
      });

      setAdminData({
        ...adminData,
        agents: [],
      });

      return;
    }

    setAdminData({
      ...adminData,
      agents: getData.data,
    });

    setNotiData({
      ...notiData,
      type: "info",
      msg: "Agent data updated successfully!",
      show: true,
    });
  };

  const _unblockAgent = async () => {
    setLoading(true);
    const results = await _unblockAgnt({
      fields: adminData.user,
      agent: adminData.agent,
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

    const getData = await _fetchAgents();

    setLoading(false);
    if (getData === undefined || getData.success === 0) {
      setNotiData({
        ...notiData,
        type: "warning",
        msg: getData.message,
        show: true,
      });

      setAdminData({
        ...adminData,
        agents: [],
      });

      return;
    }

    setAdminData({
      ...adminData,
      agents: getData.data,
    });

    setNotiData({
      ...notiData,
      type: "info",
      msg: "Agent data updated successfully!",
      show: true,
    });
  };

  const _removeAgent = async () => {
    setLoading(true);
    const results = await _delAgent(adminData.agent._id);

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

    const getData = await _fetchAgents();

    setLoading(false);
    if (getData === undefined || getData.success === 0) {
      setNotiData({
        ...notiData,
        type: "warning",
        msg: getData.message,
        show: true,
      });

      setAdminData({
        ...adminData,
        agents: [],
      });

      return;
    }

    setAdminData({
      ...adminData,
      agents: getData.data,
    });

    setNotiData({
      ...notiData,
      type: "info",
      msg: "Agent data updated successfully!",
      show: true,
    });

    history.push("/admin/agents/");
  };

  const _createProperty = async () => {
    const validate = await _validateProp(adminData.property);

    if (!validate.status)
      return setNotiData({
        ...notiData,
        type: "error",
        msg: validate.mesg,
        show: true,
      });

    setLoading(true);

    const results = await _addProperty(adminData.property);

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

      setAdminData({
        ...adminData,
        properties: [],
      });

      return;
    }

    var pend = [];
    var ps = [];
    getData.data.forEach((pro) => {
      if (pro.isApproved) ps.push(pro);
      if (!pro.isApproved) pend.push(pro);
    });

    setAdminData({
      ...adminData,
      properties: ps,
      pending: pend,
    });

    setNotiData({
      ...notiData,
      type: "info",
      msg: "Property added successfully!",
      show: true,
    });
  };

  const _findAndRouteToAgent = (_id) => {
    const agent = adminData.agents.find((item) => item._id === _id);

    if (agent) {
      setAdminData({
        ...adminData,
        agent: agent,
      });

      history.push("/admin/agents/details/" + _id);

      return;
    }
  };

  const _handleCategory = (data) => {
    const properties = adminData.properties;
    if (data.field === "all") {
      setAdminData({
        ...adminData,
        categories: {
          ...adminData.categories,
          all: data.value ? true : false,
          singleRooms: false,
          appartments: false,
          offices: false,
          shops: false,
          fullHouse: false,
        },
      });
    }
  };

  const _approve = async (data) => {
    setLoading(true);

    const results = await _approveProperty(data._id);

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

    if (getData === undefined || getData.success === 0) {
      setLoading(false);
      setNotiData({
        ...notiData,
        type: "warning",
        msg: getData.message,
        show: true,
      });

      setAdminData({
        ...adminData,
        properties: [],
      });

      return;
    }

    var pend = [];
    var ps = [];
    getData.data.forEach((pro) => {
      if (pro.isApproved) ps.push(pro);
      if (!pro.isApproved) pend.push(pro);
    });

    setAdminData({
      ...adminData,
      properties: ps,
      pending: pend,
    });

    setLoading(false);

    setNotiData({
      ...notiData,
      type: "info",
      msg: "Property Approved successfully!",
      show: true,
    });
  };

  return (
    <AdminContext.Provider
      value={{
        adminData,
        _routeToDetails,
        _routeToAgents,
        _routeToUsers,
        _handleChange,
        _cancelAdd,
        _submit,
        _createAgent,
        _changePass,
        _saveChanges,
        _blockAgent,
        _unblockAgent,
        _removeAgent,
        _createProperty,
        _resetDetails,
        _findAndRouteToAgent,
        _handleCategory,
        _approve,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}

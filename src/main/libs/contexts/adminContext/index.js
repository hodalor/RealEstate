import React, { createContext, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../authContext";
import { _validateAdmin, _validateAgent } from "../../functions/validations";
import { _addAgent, _createAdmin } from "../../functions/creates";
import { _fetchAgents, _fetchAll } from "../../functions/fetches";
import { _calcDays } from "../../functions/dateDiff";

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
    },
    agents: [],
    agent: {},
  });

  const _routeToDetails = (data) => {
    history.push("/admin/properties/details/" + data._id);
  };

  const _routeToAgents = async (data) => {
    const res = await _calcDays(data.createdAt);
    data.days = res;

    setAdminData({
      ...adminData,
      agent: data,
    });
    history.push("/admin/agents/details/" + data);
  };

  const _routeToUsers = (data) => {
    history.push("/admin/users/user-details/" + data);
  };

  useEffect(() => {
    getAdminData();
  }, []);

  const getAdminData = async () => {
    setLoading(true);
    const results = await _fetchAll();

    setLoading(false);
    if (results !== undefined) {
      const agentsData = results[0];
      if (agentsData.success === 1) {
        setAdminData({
          ...adminData,
          agents: agentsData.data,
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
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}

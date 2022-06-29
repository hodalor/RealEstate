import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { _login, _register } from "../../functions/auth";
import { _saveToStorage, _removeFromStorage } from "../../functions/storage";
import { _validateRegister, _validateUser } from "../../functions/validations";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [authState, setAuthState] = useState({
    userType: "",
    email: "",
    password: "",
    con_pass: "",
    firstName: "",
    lastName: "",
    phone: "",
    user: {},
  });

  const [notiData, setNotiData] = useState({
    type: "",
    show: true,
    msg: "",
  });

  const [loading, setLoading] = useState(false);

  const _closeNoti = () => {
    setNotiData({
      ...notiData,
      show: false,
      type: "",
      msg: "",
    });
  };

  const history = useHistory();

  const _clearFields = () => {
    setAuthState({
      ...authState,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      con_pass: "",
      phone: "",
    });
  };

  const _handleLogin = async () => {
    const validate = await _validateUser(authState);

    if (!validate.status)
      return setNotiData({
        ...notiData,
        type: "warning",
        msg: validate.mesg,
        show: true,
      });

    setLoading(true);

    const results = await _login(authState);

    _clearFields();
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

    const store = await _saveToStorage({ data: results.user, key: "user" });
    if (store) {
      setAuthState({
        ...authState,
        user: results.user,
      });

      history.push("/check");
    }
  };

  const _handleChange = (data) => {
    const { field, value } = data;

    if (field === "email")
      return setAuthState({
        ...authState,
        email: value,
      });

    if (field === "pass")
      return setAuthState({
        ...authState,
        password: value,
      });

    if (field === "con_pass")
      return setAuthState({
        ...authState,
        con_pass: value,
      });

    if (field === "phone")
      return setAuthState({
        ...authState,
        phone: value,
      });

    if (field === "firstName")
      return setAuthState({
        ...authState,
        firstName: value,
      });

    if (field === "lastName")
      return setAuthState({
        ...authState,
        lastName: value,
      });
  };

  const _handleRegister = async () => {
    const validate = await _validateRegister(authState);

    if (!validate.status)
      return setNotiData({
        ...notiData,
        type: "warning",
        msg: validate.mesg,
        show: true,
      });

    setLoading(true);

    const results = await _register(authState);

    _clearFields();
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

    setLoading(false);
    setNotiData({
      ...notiData,
      type: "success",
      msg: results.message,
      show: true,
    });
  };

  const _logout = async () => {
    const out = await _removeFromStorage("user");

    if (out) return history.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        _handleLogin,
        notiData,
        _closeNoti,
        setNotiData,
        loading,
        setLoading,
        _handleChange,
        _logout,
        _handleRegister,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

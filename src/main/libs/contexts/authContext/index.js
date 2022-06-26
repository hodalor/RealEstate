import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { _login } from "../../functions/login";
import { _saveToStorage, _removeFromStorage } from "../../functions/storage";
import { _validateUser } from "../../functions/validations";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [authState, setAuthState] = useState({
    userType: "",
    email: "",
    password: "",
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

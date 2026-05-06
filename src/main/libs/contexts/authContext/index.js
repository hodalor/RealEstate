import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { _login, _register } from "../../functions/auth";
import { _saveToStorage, _removeFromStorage } from "../../functions/storage";
import { _validateRegister, _validateUser } from "../../functions/validations";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const getStoredUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    return null;
  }
};

export default function AuthContextProvider(props) {
  const [authState, setAuthState] = useState({
    userType: "",
    email: "",
    password: "",
    con_pass: "",
    firstName: "",
    lastName: "",
    phone: "",
    user: getStoredUser(),
  });

  const [notiData, setNotiData] = useState({
    type: "",
    show: true,
    msg: "",
  });

  const [loading, setLoading] = useState(false);

  // Helper function to show toast notifications
  const _showToast = (type, message) => {
    if (!message) return;
    
    switch(type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      case "info":
        toast.info(message);
        break;
      default:
        toast.info(message);
    }
  };

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
    const normalizedAuthState = {
      ...authState,
      email: authState.email.trim().toLowerCase(),
    };

    const validate = await _validateUser(normalizedAuthState);

    if (!validate.status) {
      _showToast("warning", validate.mesg);
      return;
    }

    setLoading(true);

    const results = await _login(normalizedAuthState);

    _clearFields();
    if (results === undefined || results.success === 0) {
      setLoading(false);
      _showToast("error", results?.message || "Login failed");
      return;
    }

    setLoading(false);
    _showToast("success", results.message || "Login successful");

    const store = await _saveToStorage({ data: results.user, key: "user" });
    if (store) {
      const roleRoutes = {
        Admin: "/admin/properties/",
        Agent: "/agents/properties/",
        Buyer: "/properties/listings",
      };

      setAuthState({
        ...authState,
        user: results.user,
      });

      history.push(roleRoutes[results.user.role] || "/check");
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
    const normalizedAuthState = {
      ...authState,
      email: authState.email.trim().toLowerCase(),
      firstName: authState.firstName.trim(),
      lastName: authState.lastName.trim(),
    };

    const validate = await _validateRegister(normalizedAuthState);

    if (!validate.status) {
      _showToast("warning", validate.mesg);
      return;
    }

    setLoading(true);

    const results = await _register(normalizedAuthState);

    _clearFields();
    if (results === undefined || results.success === 0) {
      setLoading(false);
      _showToast("error", results?.message || "Registration failed");
      return;
    }

    setLoading(false);
    _showToast("success", results.message || "Registration successful");
  };

  const _logout = async () => {
    const out = await _removeFromStorage("user");

    if (out) {
      setAuthState((prevState) => ({
        ...prevState,
        user: null,
      }));

      return history.push("/login");
    }
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
        _showToast,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

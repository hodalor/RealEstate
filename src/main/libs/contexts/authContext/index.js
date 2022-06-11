import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [authState, setAuthState] = useState({
    userType: "",
  });

  const [notiData, setNotiData] = useState({
    type: "",
    show: true,
    msg: "",
  });

  const [loading, setLoading] = useState(false);

  // ** start noti handlers ** //
  const _closeNoti = () => {
    setNotiData({
      ...notiData,
      show: false,
      type: "",
      msg: "",
    });
  };
  // ** end noti handlers ** //

  const history = useHistory();

  const _handleLogin = async () => {
    // handle login here
    setAuthState({
      ...authState,
      userType: "ADMIN",
    });
    history.push("/check");
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

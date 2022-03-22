import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [authState, setAuthState] = useState({
    userType: "",
  });

  const history = useHistory();

  const _handleLogin = async () => {
    // handle login here
    setAuthState({
      ...authState,
      userType: "BUYERS",
    });
    history.push("/check");
  };

  return (
    <AuthContext.Provider value={{ authState, _handleLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
}

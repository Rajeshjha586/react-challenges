import React, { useState } from "react";
import { authContext } from "./AuthContext";

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <authContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export { AuthProvider };

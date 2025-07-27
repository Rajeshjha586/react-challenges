import React, { useContext } from "react";
import { authContext } from "./AuthContext";

function NavBar() {
  const { logout, isAuthenticated } = useContext(authContext);

  return (
    <nav>
      <span role="img" aria-label="Money bags emoji">
        💰
      </span>
      {isAuthenticated && (
        <button className="link" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export { NavBar };

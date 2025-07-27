import React, { useContext } from "react";
import { authContext } from "./AuthContext";
import { LoginForm } from "./LoginForm";
import { Dashbaord } from "./Dashboard";

function Main() {
  const { isAuthenticated } = useContext(authContext);
  return <main>{isAuthenticated ? <Dashbaord /> : <LoginForm />}</main>;
}

export { Main };

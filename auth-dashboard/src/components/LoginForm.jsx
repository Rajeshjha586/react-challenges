import React, { useContext } from "react";
import { authContext } from "./AuthContext";

function LoginForm() {
  const { login } = useContext(authContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    login(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
        />
      </div>
      <button className="primary" type="submit">
        Login
      </button>
    </form>
  );
}

export { LoginForm };

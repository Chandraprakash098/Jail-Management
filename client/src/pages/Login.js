import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../styles/Login.css'

const Login = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(uniqueId, password);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Unique ID"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

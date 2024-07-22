import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await register(uniqueId, password);
    navigate("/dashboard");
  };

  return (
    <div className="register">
      <h1>Register</h1>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

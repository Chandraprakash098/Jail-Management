import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const register = async (uniqueId, password) => {
    const { data } = await axios.post(
      `/api/auth/register`,
      {
        uniqueId,
        password,
      }
    );
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const login = async (uniqueId, password) => {
    const { data } = await axios.post(
      `/api/auth/login`,
      {
        uniqueId,
        password,
      }
    );
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    alert("Logout successful!");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

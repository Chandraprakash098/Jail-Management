import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Header.css"; // Import the custom CSS file

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="brand">
            App
          </Link>
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className={getLinkClass("/")}>
            Home
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                Dashboard
              </Link>
              <button onClick={logoutHandler} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={getLinkClass("/login")}>
                Login
              </Link>
              {/* <Link to="/register" className={getLinkClass("/register")}>
                Register
              </Link> */}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

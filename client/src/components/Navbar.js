import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successfully!");
    navigate("/login");
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">📝</span>
          <span className="brand-text">Todo<span className="brand-accent">App</span></span>
        </Link>

        {/* Navigation Links List */}
        <ul className="navbar-links">
          <li>
            <Link to="/" className="nav-item">Home</Link>
          </li>
          <li>
            <Link to="/about" className="nav-item">About</Link>
          </li>

          {token ? (
            <>
              <li>
                <Link to="/todoList" className="nav-item">My Tasks</Link>
              </li>
              <li className="user-greeting">
                <span className="user-badge">
                  {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                </span>
                <span className="user-name">Hi, {user?.username || "User"}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-item">Login</Link>
              </li>
              <li>
                <Link to="/register" className="btn-register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
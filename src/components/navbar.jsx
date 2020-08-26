import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <ul className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/movies">
          Movies
        </NavLink>
        <NavLink className="nav-item nav-link" to="/customers">
          Customers
        </NavLink>
        <NavLink className="nav-item nav-link" to="/rentals">
          Rentals
        </NavLink>
        <NavLink className="nav-item nav-link" to="/login">
          Login
        </NavLink>
      </ul>
    </nav>
  );
};

export default NavBar;

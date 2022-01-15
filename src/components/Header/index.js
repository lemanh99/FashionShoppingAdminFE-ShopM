import React from "react";
import { NavLink } from "react-router-dom";
import NotificationHeader from "./notification_header";

const Header = (props) => {
  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to={`#`}
              className="nav-link"
              data-widget="pushmenu"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </NavLink>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <NavLink to={`/signin`} className="nav-link">
              Home
            </NavLink>
          </li>
        </ul>
        <form className="form-inline ml-3">
          <div className="input-group input-group-sm">
            <input
              className="form-control form-control-navbar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </form>
        <NotificationHeader />
      </nav>
    </>
  );
};

export default Header;

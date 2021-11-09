import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { inforUser } from "../../actions";

const Sidebar = (props) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user.infor.id===null) {
      dispatch(inforUser());
    }
  }, []);

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <NavLink to={"/"} className="brand-link">
        <img
          src={`${process.env.PUBLIC_URL}/assets/img/phone.jpg`}
          alt="Avatar"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light">
          Shop Manager
        </span>
      </NavLink>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/avatar.jpg`}
              className="img-circle elevation-2"
              alt="Admin Image"
              aria-hidden
            />
          </div>
          <div className="info">
            <a href="{{url_for('admin_manager')}}" className="d-block">
              {user.infor.fullName}
            </a>
          </div>
        </div>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink to={`/dashboard`} className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/manage-admin`} className="nav-link">
                <i className="nav-icon fas fa-users-cog"></i>
                <p>Admin</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/manage-customer`} className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>Customer</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/manage-category`} className="nav-link">
                <i className="nav-icon fas fa-plus-square"></i>
                <p>Category</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/manage-product`} className="nav-link">
                <i className="nav-icon fas fa-barcode"></i>
                <p>Product</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/manage-order`} className="nav-link">
                <i className="nav-icon fas fa-inbox"></i>
                <p>Orders</p>
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to={`/statistical`} className="nav-link">
                <i className="nav-icon fas fa-chart-bar"></i>
                <p>Statistical</p>
              </NavLink>
            </li> */}

            <li className="nav-item">
              <NavLink to="/settings" className="nav-link ">
                <i className="nav-icon fas fa-cog"></i>
                <p>Settings</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/signout`} className="nav-link">
                <i className="nav-icon fas fa-sign-out-alt"></i>
                <p>Logout</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
export default Sidebar;

import React from "react";
import { NavLink } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Layout = (props) => {

  return (
    <>
      <div className="wrapper">
        <Header />
        <Sidebar />
        {/* <!-- Main content --> */}
        <div class="content-wrapper">
          <section className="content">
            <div className="container-fluid" style={{ marginBottom: "-20px" }}>
              <div className="row mb-2">
                <div className="col-sm-6"></div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <NavLink to={`/`}>Home</NavLink>
                    </li>
                    {props.title ? (
                      <li className="breadcrumb-item active">{props.title}</li>
                    ) : null}
                  </ol>
                </div>
              </div>
            </div>
          </section>
          {props.children}
        </div>

        <Footer />
        {/* <!-- Control Sidebar --> */}
        <aside className="control-sidebar control-sidebar-dark">
          {/* <!-- Control sidebar content goes here --> */}
        </aside>
      </div>
    </>
  );
};

export default Layout;

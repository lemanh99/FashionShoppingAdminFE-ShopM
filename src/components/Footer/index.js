import React from "react";

const Footer = (props) => {
  return (
    <>
      <footer className="main-footer">
        <div className="float-right d-none d-sm-block">
          <b>Version</b> 0.0.1
        </div>
        <strong>
          Bootstrap Admin Dashboard Template Free in &copy;{" "}
          <a href="http://adminlte.io">AdminLTE.io</a>.
        </strong>{" "}
        All rights reserved. & Design By{" "}
        <strong>
          <a
            href="https://github.com/lemanh99/WebThucTapCongNhan"
            target="_blank"
            className="copyrightlink"
            rel="noreferrer"
          >
            Lê Xuân Mạnh
          </a>
        </strong>
      </footer>
    </>
  );
};

export default Footer;

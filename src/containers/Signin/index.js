import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../actions";
import Notification from "../../components/UI/Notification";

const Signin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const adminLogin = (e) => {
    e.preventDefault();
    const admin = {
      username,
      password,
    };
    dispatch(login(admin));
  };
  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  return (
    <>
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <NavLink className="text-black" to={`/`}>
              <b>Mobile Shop</b> ONLINE
            </NavLink>
          </div>
          <div>
            {auth.error !== "" ? (
              <Notification type="danger" message={auth.error} />
            ) : null}
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start Admin account</p>

              <form
                method="post"
                enctype="multipart/form-data"
                onSubmit={adminLogin}
              >
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Log In
                    </button>
                  </div>
                  <div className="col-8 align-self-end">
                    <NavLink to={`/`} style={{ marginLeft: "127px" }}>
                      Trang chủ
                    </NavLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;

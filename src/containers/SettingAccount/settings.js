import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inforUser } from "../../actions";
import {
  ChangeInformation,
  ChangePassword,
} from "../../actions/Admin/settings.actions";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";

const Settings = (props) => {
  const setting = useSelector((state) => state.setting_admin);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user.infor)
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    setMessage("");
    dispatch(inforUser())
  }, []);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
  }, [user])

  useEffect(() => {
    if (!setting.loading) {
      setPassword("");
      setRePassword("");
    }
  }, [setting.loading]);

  const changeInfo = (e) => {
    e.preventDefault();
    const infor = {
      id: auth.user._id,
      firstName,
      lastName,
    };
    dispatch(ChangeInformation(infor));
    setMessage("Change Information Success!");
  };
  const ChangePass = (e) => {
    e.preventDefault();
    const pass = {
      password: password,
    };
    dispatch(ChangePassword(pass));
    setMessage("Update Passsword Success");
  };
  const validate = (e, type = 1) => {
    e.preventDefault();
    let value = e.target.value;
    // var reg = new RegExp("(?=.*[a-z])(?=.*[A-Z]}.{6,32}$");
    // var test = reg.test(value);
    type === 1 ? setPassword(value) : setRePassword(value);
    switch (type) {
      case 1:
        if (value.length < 6) {
          setMessage("Input with a minimum length of 6 characters");
          break;
        } else {
          setMessage("");
        }
        if (repassword.length > 0 && repassword !== value) {
          setMessage("Entered Password is not matching!!");
          break;
        }
        if (repassword === value) {
          console.log("Password matching!!");
          break;
        }
        break;
      case 2:
        if (password !== value) {
          setMessage("Entered Password is not matching!!");
        } else {
          setMessage("Password matching!!");
        }
        break;
      default:
        break;
    }
  };
  return (
    <Layout title="Setting account">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card card-primary card-tabs">
                <div className="card-header p-0 pt-1">
                  <ul
                    className="nav nav-tabs"
                    id="custom-tabs-one-tab"
                    role="tablist"
                  >
                    <li
                      className="nav-item"
                      onClick={(e) => {
                        setMessage("");
                      }}
                    >
                      <a
                        className="nav-link active"
                        id="custom-tabs-one-home-tab"
                        data-toggle="pill"
                        href="#custom-tabs-one-home"
                        role="tab"
                        aria-controls="custom-tabs-one-home"
                        aria-selected="true"
                      >
                        Change Infomation Account
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      onClick={(e) => {
                        setMessage("");
                      }}
                    >
                      <a
                        className="nav-link"
                        id="custom-tabs-one-profile-tab"
                        data-toggle="pill"
                        href="#custom-tabs-one-profile"
                        role="tab"
                        aria-controls="custom-tabs-one-profile"
                        aria-selected="false"
                      >
                        Change Password
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content" id="custom-tabs-one-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="custom-tabs-one-home"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-one-home-tab"
                    >
                      <div className="card">
                        <div className="row justify-content-center">
                          <div></div>
                        </div>
                        <div className="card-body">
                          <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-6">
                              <div class="card card-primary">
                                <div class="card-header">
                                  <h3 class="card-title">Information</h3>
                                </div>
                                <form
                                  method="post"
                                  enctype="multipart/form-data"
                                  onSubmit={changeInfo}
                                >
                                  <div class="card-body">
                                    <Notification
                                      type="success"
                                      message={message}
                                    />
                                    <div class="form-group">
                                      <label>Email address</label>
                                      <input
                                        type="email"
                                        class="form-control"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                        disabled
                                      />
                                    </div>
                                    <div class="form-group">
                                      <label for="">First Name</label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter first name"
                                        value={firstName}
                                        onChange={(e) =>
                                          setFirstName(e.target.value)
                                        }
                                        required
                                      />
                                    </div>
                                    <div class="form-group">
                                      <label for="">Last Name</label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter last name"
                                        value={lastName}
                                        onChange={(e) =>
                                          setLastName(e.target.value)
                                        }
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div class="card-footer">
                                    <button
                                      type="submit"
                                      class="btn btn-primary"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="custom-tabs-one-profile"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-one-profile-tab"
                    >
                      <div>
                        <div className="card">
                          <div className="card-body">
                            <div class="row">
                              <div class="col-md-3"></div>
                              <div class="col-md-6">
                                <div class="card card-primary">
                                  <div class="card-header">
                                    <h3 class="card-title">Reset Password</h3>
                                  </div>
                                  <form
                                    method="post"
                                    enctype="multipart/form-data"
                                    onSubmit={ChangePass}
                                  >
                                    <div class="card-body">
                                      {message === "Password matching!!" ||
                                      message === "Update Passsword Success" ? (
                                        <Notification
                                          type="success"
                                          message={message}
                                        />
                                      ) : (
                                        <Notification
                                          type="danger"
                                          message={message}
                                        />
                                      )}
                                      <div class="form-group">
                                        <label>Password</label>
                                        <input
                                          type="password"
                                          class="form-control"
                                          placeholder="Password"
                                          value={password}
                                          onChange={(e) => validate(e)}
                                          minlength="6"
                                          required
                                        />
                                      </div>
                                      <div class="form-group">
                                        <label>Confirm Password</label>
                                        <input
                                          type="password"
                                          class="form-control"
                                          placeholder="Confirm Password"
                                          value={repassword}
                                          onChange={(e) => validate(e, 2)}
                                          required
                                        />
                                      </div>
                                    </div>

                                    <div class="card-footer">
                                      <button
                                        type="submit"
                                        class="btn btn-primary"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Settings;

import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockCustomer, getListCustomer, register } from "../../actions";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";
import AddCustomerModal from "./components/AddCustomerModal";
import DetailCustomerModal from "./components/DetailCustomerModal";

const Customer = () => {
  const customer = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  //entries
  const [selected, setSelected] = useState("1");
  const [search, setSearch] = useState("");

  const [listCustomer, setListCustomer] = useState([]);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    dispatch(getListCustomer());
  }, [dispatch]);
  useEffect(() => {
    setListCustomer(customer.listCustomer);
  }, [customer.listCustomer]);

  useEffect(() => {
    setMessage(customer.messages);
  }, [customer.messages]);

  //Handle show modal
  const handleShow = (event) => {
    const id = event.target.value;
    const user = customer.listCustomer.find((customer) => customer._id === id);
    setUser(user);
    setShow(true);
  };
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    const customer = {
      firstName,
      lastName,
      email,
      username,
      password,
      phoneNumber,
      address,
    };
    dispatch(register(customer));
    setShow(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    // setMessage("Register a new customer successfully!");
    setShowAdd(false);
  };
  const handleSelect = (event) => {
    setSelected(event.target.value);
    setSearch("");
  };
  //selected
  const searchList = (event) => {
    const value = event.target.value;
    let lst = null;
    setSearch(value);
    switch (selected) {
      case "1":
        lst = customer.listCustomer.filter((customer) =>
          customer.username.toLowerCase().includes(value.toLowerCase())
        );
        break;
      case "2":
        lst = customer.listCustomer.filter((customer) =>
          customer.email.toLowerCase().includes(value.toLowerCase())
        );
        break;
      case "3":
        lst = customer.listCustomer.filter((customer) =>
          customer.fullName.toLowerCase().includes(value.toLowerCase())
        );
        break;
      default:
        break;
    }
    setListCustomer(lst);
  };
  //row table
  const rowTable = (customers) => {
    const all = [];
    for (let [index, customer] of customers.entries()) {
      var element = {
        sr: index + 1,
        email: customer.email,
        fullName: customer.full_name,
        btnView: (
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              class="btn btn-warning "
              value={customer._id}
              style={{ marginRight: "4px" }}
              onClick={handleShow}
            >
              Detail
            </button>
          </div>
        ),
        btnLock: (
          <div style={{ textAlign: "center" }}>
            {customer.status_id === 2 ? (
              <button
                type="button"
                class="btn btn-dark"
                onClick={() => {
                  dispatch(blockCustomer(customer.id, 1)).then(() => {
                    dispatch(getListCustomer())
                  })
                }}
              >
                Lock
              </button>
            ) : (
              <button
                type="button"
                class="btn btn-success"
                onClick={() => {
                  dispatch(blockCustomer(customer.id, 2)).then(() => {
                    dispatch(getListCustomer())
                  })
                }}
              >
                Unlock
              </button>
            )}
          </div>
        ),
        //   a
      };
      all.push(element);
    }
    return all;
  };
  const data = {
    columns: [
      {
        label: "No.",
        field: "sr",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 150,
      },
      {
        label: "Full name",
        field: "fullName",
        sort: "asc",
        width: 270,
      },
      {
        label: "",
        field: "btnView",
        sort: "asc",
        width: 50,
      },
      {
        label: "",
        field: "btnLock",
        sort: "asc",
        width: 50,
      },
    ],
    rows: rowTable(listCustomer),
  };
  return (
    <Layout title="Manage customer">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div class="card-title">
                    <button
                      className="btn btn-block bg-gradient-primary"
                      onClick={handleShowAdd}
                    >
                      New A Customer
                    </button>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div style={{ marginTop: "5px", marginBottom: "-67px" }}>
                    {message !== "" ? (
                      customer.error !== "" ? (
                        <Notification type="danger" message={message} />
                      ) : (
                        <Notification type="success" message={message} />
                      )
                    ) : null}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "-80px" }}>
                  <div className="col-lg-12">
                    <div className="" style={{ float: "right" }}>
                      <div className="card-body">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <select
                              className="btn btn-default dropdown-toggle"
                              value={selected}
                              style={{ backgroundColor: "#e9ecef" }}
                              onChange={(e) => handleSelect(e)}
                            >
                              <option className="dropdown-item" value="1">
                                Username
                              </option>
                              <option className="dropdown-item" value="2">
                                Email
                              </option>
                              <option className="dropdown-item" value="3">
                                Full Name
                              </option>
                            </select>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => {
                              searchList(e);
                            }}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="card-body">
                    <MDBDataTable
                      entries={5}
                      entriesOptions={[5, 10, 15, 20, 25, 50]}
                      searching={false}
                      striped
                      bordered
                      hover
                      // barReverse
                      noBottomColumns
                      data={data}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DetailCustomerModal
        show={show}
        handleClose={() => setShow(false)}
        modalTitle={"Detail Customer"}
        user={user}
      />

      <AddCustomerModal
        show={showAdd}
        handleClose={() => setShowAdd(false)}
        onSubmit={handleCloseAdd}
        modalTitle={"Add New Customer"}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        address={address}
        setAddress={setAddress}
        listCustomer={listCustomer}
      />
      {/* <DeleteAdminModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        modalTitle={"Delete Admin"}
        onSubmit={handleCloseDelete}
        adminDelete={adminDelete}
        setAdminDelete={setAdminDelete}
      /> */}
    </Layout>
  );
};

export default Customer;

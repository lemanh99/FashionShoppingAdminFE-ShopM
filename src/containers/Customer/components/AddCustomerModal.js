import React, { useState } from "react";
import NewModal from "../../../components/UI/Modal";
import Notification from "../../../components/UI/Notification";

const AddCustomerModal = (props) => {
  const [message, setMessage] = useState("");
  const {
    show,
    handleClose,
    modalTitle,
    onSubmit,
    firstName,
    lastName,
    email,
    username,
    password,
    phoneNumber,
    address,
    setFirstName,
    setLastName,
    setEmail,
    setUsername,
    setPassword,
    setPhoneNumber,
    setAddress,
    listCustomer,
  } = props;

  const check = (value, type) => {
    switch (type) {
      case 1:
        const checkEmail = listCustomer.find(
          (listCustomer) => listCustomer.email === value
        );
        checkEmail ? setMessage("Account already exists") : setMessage("");
        break;
      case 2:
        const check = listCustomer.find(
          (listCustomer) => listCustomer.email === email
        );
        if (check) {
          setMessage("Account already exists");
          break;
        }
        const checkUsername = listCustomer.find(
          (listCustomer) => listCustomer.username === value
        );
        checkUsername ? setMessage("Username already exists") : setMessage("");
        break;
      default:
        break;
    }
  };
  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      onSubmit={message === "" ? onSubmit : null}
      modalTitle={modalTitle}
    >
      <div className="card-body">
        {message ? <Notification type="danger" message={message} /> : ""}

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              check(e.target.value, 1);
            }}
            autofocus
            required
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              check(e.target.value, 2);
            }}
            autofocus
            required
          />
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div className="form-group">
              <label for="">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          </div>
          <div class="col-sm-6">
            <div className="form-group">
              <label for="">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
      </div>
    </NewModal>
  );
};

export default AddCustomerModal;

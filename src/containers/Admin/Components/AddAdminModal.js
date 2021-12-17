import React, { useState } from "react";
import NewModal from "../../../components/UI/Modal";
import Notification from "../../../components/UI/Notification";

const AddAdminModal = (props) => {
  const [message, setMessgae] = useState("");
  const {
    show,
    handleClose,
    modalTitle,
    onSubmit,
    firstName,
    lastName,
    email,
    password,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    listAdmin,
    username,
    setUsername,
  } = props;
  const checkEmail = (value) => {
    const checkEmail = listAdmin.find((listAdmin) => listAdmin.email === value);
    checkEmail ? setMessgae("Account already exists") : setMessgae(null);
  };
  console.log(email);

  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
      modalTitle={modalTitle}
    >
      <div className="card-body">
        {message ? <Notification type="danger" message={message} /> : ""}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            autofocus
            required
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              checkEmail(e.target.value);
            }}
            autofocus
            required
          />
        </div>
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
      </div>
    </NewModal>
  );
};

export default AddAdminModal;

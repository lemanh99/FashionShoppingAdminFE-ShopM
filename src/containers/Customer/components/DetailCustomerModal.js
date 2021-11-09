import React from "react";
import NewModal from "../../../components/UI/Modal";

const DetailCustomerModal = (props) => {
  const { show, handleClose, modalTitle, user } = props;
  const buttons = [
    {
      label: "Back",
      className: "btn btn-warning",
      onClick: handleClose,
    },
  ];

  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      modalTitle={modalTitle}
      buttons={buttons}
    >
        <div class="row">
          <div class="col-sm-6">
            <div className="form-group">
              <label for="">First Name</label>
              <input
                type="text"
                className="form-control"
                value={user.firstName}
                disabled
              />
            </div>
          </div>
          <div class="col-sm-6">
            <div className="form-group">
              <label for="">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={user.lastName}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={user.email}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={user.username}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            value={user.phoneNumber}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            value={user.address}
            disabled
          />
        </div>
    </NewModal>
  );
};

export default DetailCustomerModal;

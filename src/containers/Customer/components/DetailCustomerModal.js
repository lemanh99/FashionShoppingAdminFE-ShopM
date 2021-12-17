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
      <div className="form-group">
        <label for="">Full Name</label>
        <input
          type="text"
          className="form-control"
          value={user.full_name}
          disabled
        />
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
        <label>Phone Number</label>
        <input
          type="text"
          className="form-control"
          value={user.phone_number}
          disabled
        />
      </div>
    </NewModal>
  );
};

export default DetailCustomerModal;

import React, { useEffect, useState } from "react";
import NewModal from "../../../components/UI/Modal";
import Notification from "../../../components/UI/Notification";
const ViewPaymentModal = (props) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    setMessage("");
  }, []);
  const {
    show,
    handleClose,
    modalTitle,
    onSubmit,
    listPayment,
    paymentMethod,
    setPaymentMethod,
    visible,
    setVisible,
    edit,
    setEdit,
  } = props;
  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      onSubmit={!edit ? (e) => setEdit(!edit) : onSubmit}
      buttonName={!edit ? "Edit" : "Save"}
      modalTitle={modalTitle}
    >
      <div className="card-body">
        <div className="form-group">
          <label>Payment Method</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name product"
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value);
            }}
            required
            disabled={!edit}
          />
        </div>
        <div className="form-group">
          <label>Visible</label>
          <select
            name="category"
            id="category"
            value={visible}
            className="form-control"
            required
            onChange={(e) => setVisible(e.target.value)}
            disabled={!edit}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
      </div>
    </NewModal>
  );
};

export default ViewPaymentModal;

import React, { useEffect, useState } from "react";
import NewModal from "../../../components/UI/Modal";
import Notification from "../../../components/UI/Notification";
const AddPaymentModal = (props) => {
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
  } = props;
  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
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
          >
            <option value={true}>True</option>
            <option value={true}>False</option>
          </select>
        </div>
      </div>
    </NewModal>
  );
};

export default AddPaymentModal;

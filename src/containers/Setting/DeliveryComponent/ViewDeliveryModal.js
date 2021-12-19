import React, { useEffect, useState } from "react";
import NewModal from "../../../components/UI/Modal";
import Notification from "../../../components/UI/Notification";
const ViewDeliveryModal = (props) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    setMessage("");
  }, []);
  const {
    show,
    handleClose,
    modalTitle,
    onSubmit,
    listDelivery,
    name,
    setName,
    serviceName,
    setServiceName,
    confirmUrl,
    setConfirmUrl,
    description,
    setDescription,
    visible,
    setVisible,
    edit,
    setEdit
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
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name delivery"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            disabled={!edit}
          />
        </div>
        <div className="form-group">
          <label>Service name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter service name"
            value={serviceName}
            onChange={(e) => {
              setServiceName(e.target.value);
            }}
            required
            disabled={!edit}
          />
        </div>
        <div className="form-group">
          <label>Confirm url</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter confirm url"
            value={confirmUrl}
            onChange={(e) => {
              setConfirmUrl(e.target.value);
            }}
            required
            disabled={!edit}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name product"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
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

export default ViewDeliveryModal;

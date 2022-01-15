import React, { useEffect, useState } from "react";
import NewModal from "../../../components/UI/Modal";
import Notification from "../../../components/UI/Notification";
const ViewNotificationModal = (props) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    setMessage("");
  }, []);
  const {
    show,
    handleClose,
    modalTitle,
    onSubmit,
    userIds,
    setUserIds,
    title,
    setTitle,
    content,
    setContent,
    groupID,
    setGroupId,
    url,
    setUrl,
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
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
            disabled={!edit}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Enter content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            required
            disabled={!edit}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Url notification</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            required
            disabled={!edit}
          />
        </div>
        <div className="form-group">
          <label>Group</label>
          <select
            name="group"
            id="group"
            value={groupID}
            className="form-control"
            required
            onChange={(e) => setGroupId(e.target.value)}
            disabled={!edit}
          >
            <option value="2">Admin</option>
            <option value="3">Customer</option>
          </select>
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

export default ViewNotificationModal;

import React, { useEffect, useState } from "react";
import NewModal from "../../../components/UI/Modal";
import Notification from "../../../components/UI/Notification";

const AddCategoryModal = (props) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
  }, []);
  const {
    show,
    handleClose,
    modalTitle,
    onSubmit,
    name,
    setName,
    listCategory,
    parentCategory,
    // handleCategoryImage,
    // categoryImage,
    // setCategoryImage,
  } = props;
  const check = (value) => {
    console.log(value);
    const checkName = listCategory.find(
      (listCategory) => listCategory.name === value
    );
    checkName ? setMessage("Name already exists") : setMessage("");
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
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name category"
            value={name}
            onChange={(e) => {
              check(e.target.value);
              setName(e.target.value);
            }}
            required
          />
        </div>
      </div>
    </NewModal>
  );
};

export default AddCategoryModal;

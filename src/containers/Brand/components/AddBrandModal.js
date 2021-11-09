import React, { useEffect, useState } from "react";
import NewModal from "../../../components/UI/Modal";
import Notification from "../../../components/UI/Notification";

const AddBrandModal = (props) => {
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
    categoryId,
    setCategoryId,
    listBrand,
    listCategory,
    // handlebrandImage,
    brandImage,
    setBrandImage,
  } = props;
  const check = (value) => {
    console.log(value);
    const checkName = listBrand.find((listBrand) => listBrand.name === value);
    checkName ? setMessage("Name already exists") : setMessage("");
  };
  const handleAddImage = (event) => {
    setBrandImage(event.target.files[0]);
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
            placeholder="Enter name brand"
            value={name}
            onChange={(e) => {
              check(e.target.value);
              setName(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            id="category"
            value={categoryId}
            className="form-control"
            required
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select 1 category</option>
            {listCategory
              ? listCategory.map((category) => (
                  <option value={category._id}>{category.name}</option>
                ))
              : null}
          </select>
        </div>

        <div class="form-group">
          <label for="customFile">Image</label>
          <div className="row" style={{ marginBottom: "5px" }}>
            {brandImage ? (
              <img
                id={brandImage.name}
                src={window.URL.createObjectURL(brandImage)}
                width="100"
                height="100"
                alt="brand image"
                aria-hidden
              />
            ) : null}
          </div>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              accept="image/png, image/jpeg"
              onChange={handleAddImage}
            />
            <label className="custom-file-label" for="customFile">
              {brandImage.name ? brandImage.name : "Choose file"}
            </label>
          </div>
        </div>
      </div>
    </NewModal>
  );
};

export default AddBrandModal;

import React, { useEffect, useState } from "react";
import NewModal from "../../../components/UI/Modal";
import Notification from "../../../components/UI/Notification";
import { generatePublicUrl } from "../../../urlConfig";

const EditBrandModal = (props) => {
  const [message, setMessage] = useState("");
  const [change, setChange] = useState(false);

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
    brandImage,
    setBrandImage,
  } = props;
  console.log(brandImage);
  const check = (value) => {
    const checkName = listBrand.find((listBrand) => listBrand.name === value);
    checkName ? setMessage("Name already exists") : setMessage("");
  };
  const changeImage = (event) => {
    setBrandImage(event.target.files[0]);
    document.getElementById("img-change").src = window.URL.createObjectURL(
      event.target.files[0]
    );
    setChange(true);
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
            <img
              id="img-change"
              alt=""
              src=""
              width={change ? "100" : null}
              height={change ? "100" : null}
            />
            {!change ? (
              <img
                id="img"
                alt={brandImage}
                src={generatePublicUrl(brandImage)}
                width="100"
                height="100"
              />
            ) : null}
          </div>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              accept="image/png, image/jpeg"
              onChange={changeImage}
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

export default EditBrandModal;

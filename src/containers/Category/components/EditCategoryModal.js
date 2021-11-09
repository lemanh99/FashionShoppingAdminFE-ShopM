import React, { useEffect, useState } from "react";
import NewModal from "../../../components/UI/Modal";
import Notification from "../../../components/UI/Notification";
import { generatePublicUrl } from "../../../urlConfig";

const EditCategoryModal = (props) => {
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
    // categoryImage,
    // setCategoryImage,
    listCategory,
  } = props;
  const check = (value) => {
    const checkName = listCategory.find(
      (listCategory) => listCategory.name === value
    );
    checkName ? setMessage("Name already exists") : setMessage("");
  };
  // const changeImage = (event) => {
  //   setCategoryImage(event.target.files[0]);
  //   document.getElementById("img-change").src = window.URL.createObjectURL(
  //     event.target.files[0]
  //   );
  //   setChange(true);
  // };

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
{/* 
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
                alt={categoryImage}
                src={generatePublicUrl(categoryImage)}
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
              {categoryImage.name ? categoryImage.name : "Choose file"}
            </label>
          </div>
        </div> */}
      </div>
    </NewModal>
  );
};

export default EditCategoryModal;

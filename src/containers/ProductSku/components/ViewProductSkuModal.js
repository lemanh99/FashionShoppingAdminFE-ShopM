import React, { useEffect, useState } from "react";
import NewModal from "../../../components/UI/Modal";
import Notification from "../../../components/UI/Notification";

const ViewProductSkuModal = (props) => {
  const [message, setMessage] = useState("");
  // const [listSize, setListSize] = useState([]);
  // const [color, setColor] = useState([]);
  // const [listSelect, setListSelect] = useState([]);

  useEffect(() => {
    setMessage("");
  }, []);


  const {
    show,
    handleClose,
    modalTitle,
    onSubmit,
    stock,
    setStock,
    price,
    setPrice,
    size,
    setSize,
    color,
    setColor,
    listColor,
    listSize,
    imageSkuShow,
    imageSku,
    setImageSku,
    edit,
    setEdit,
  } = props;



  const handleProductPictures = (event) => {
    console.log(event.target.files[0])
    // setImageSku([event.target.files[0]]);
    setImageSku([event.target.files[0]])
  };
  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      onSubmit={!edit ? (e) => setEdit(!edit) : onSubmit}
      buttonName={!edit ? "Edit" : "Save"}
      modalTitle={modalTitle}
    >
      <div className="card-body">
        {message ? <Notification type="danger" message={message} /> : ""}
        <div class="row">
          <div class="col-sm-6">
            <div className="form-group">
              <label>Price (VND)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter number"
                min="0"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                disabled={!edit}
              />
            </div>
          </div>
          <div class="col-sm-6">
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                min="0"
                className="form-control"
                placeholder="Enter number"
                value={stock}
                disabled={!edit}
                onChange={(e) => {
                  setStock(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div className="form-group">
              <label>Size</label>
              <select
                name="size"
                id="size"
                value={size}
                className="form-control"
                disabled={!edit}
                onChange={(e) => setSize(e.target.value)}
              >
                {listSize[0]
                  ? listSize[0].data.map((size) => (
                    <option value={size.id}>{size.name}</option>
                  ))
                  : null}
              </select>
            </div>
          </div>
          <div class="col-sm-6">
            <div className="form-group">
              <label>Color</label>
              <select
                name="color"
                id="color"
                value={color}
                className="form-control"
                disabled
              >
                {listColor[0]
                  ? listColor[0].data.map((color) => (
                    <option value={color.id}>{color.name}</option>
                  ))
                  : null}
              </select>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="customFile">Image</label>
          <div className="row" style={{ marginBottom: "5px", justifyContent: "center" }}>
            {imageSku && imageSku.length == 0
              ? (
                <img
                  id="img"
                  src={imageSkuShow}
                  width="100"
                  height="100"
                  alt={`image product`}
                  aria-hidden
                />
              )
              : <img
                id="img-s"
                src={!imageSku.img ? window.URL.createObjectURL(imageSku[0]) : null}
                width="100"
                height="100"
                alt={`image product`}
                aria-hidden
              />}
          </div>
          {edit ? (
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                accept="image/png, image/jpeg"
                onChange={handleProductPictures}
              />
              <label className="custom-file-label" for="customFile">
                Change image
              </label>
            </div>
          ) : null}

        </div>
      </div>
    </NewModal>
  );
};

export default ViewProductSkuModal;

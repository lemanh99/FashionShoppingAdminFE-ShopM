import React, { useEffect, useState } from "react";
import NewModal from "../../../components/UI/Modal";
import Notification from "../../../components/UI/Notification";

const AddProductSkuModal = (props) => {
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
    imageSku,
    setImageSku,
    listProductSku,
  } = props;
  const handleProductPictures = (event) => {
    // setImageSku([event.target.files[0]]);
    setImageSku([event.target.files[0]])
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
                required
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
                onChange={(e) => {
                  setStock(e.target.value);
                }}
                required
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
                required
                onChange={(e) => setSize(e.target.value)}
              >
                {size == null ? (<option value="">Select 1 Size</option>) : null}
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
                required
                onChange={(e) => setColor(e.target.value)}
              >
                {color == null ? (<option value="">Select 1 color</option>) : null}
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
            {imageSku.length > 0
              ? (
                <img
                  id="img-s"
                  src={!imageSku.img ? window.URL.createObjectURL(imageSku[0]) : null}
                  width="100"
                  height="100"
                  alt={`image product`}
                  aria-hidden
                />
              )
              : null}
          </div>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              accept="image/png, image/jpeg"
              onChange={handleProductPictures}
            />
            <label className="custom-file-label" for="customFile">
              Choose file
            </label>
          </div>
        </div>
      </div>
    </NewModal>
    
  );
};

export default AddProductSkuModal;

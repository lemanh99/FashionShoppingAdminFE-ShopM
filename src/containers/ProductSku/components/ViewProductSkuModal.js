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
    price,
    size,
    color,
    listColor,
    listSize,
    imageSku,
  } = props;
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
                disabled
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
                disabled
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
                disabled
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
            {imageSku
              ? (
                <img
                  id="img"
                  src={imageSku}
                  width="100"
                  height="100"
                  alt={`image product`}
                  aria-hidden
                />
              )
              : null}
          </div>
        </div>
      </div>
    </NewModal>
  );
};

export default ViewProductSkuModal;

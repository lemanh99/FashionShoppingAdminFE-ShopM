import React from "react";
import NewModal from "../../../components/UI/Modal";
import { generatePublicUrl } from "../../../urlConfig";

const ViewProductModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    onSubmit,
    name,
    price,
    quantity,
    discount,
    description,
    brandId,
    category,
    productPictures,
  } = props;
  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      // onSubmit={onSubmit}
      modalTitle={modalTitle}
    >
      <div className="card-body">
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} disabled/>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" className="form-control" value={price} disabled/>
            </div>
          </div>
          <div class="col-sm-4">
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                min="0"
                value={quantity} disabled
              />
            </div>
          </div>
          <div class="col-sm-4">
            <div className="form-group">
              <label>Discount(%)</label>
              <input type="number" className="form-control" value={discount} disabled />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div className="form-group">
              <label>Category</label>
              <input
                name="category"
                id="category"
                value={category}
                className="form-control" disabled
              />
            </div>
          </div>
          <div class="col-sm-6">
            <div className="form-group">
              <label>Brand</label>
              <input
                name="brand"
                id="brand"
                value={brandId}
                className="form-control" disabled
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            type="text"
            className="form-control"
            rows="5"
            value={description} disabled
          ></textarea>
        </div>

        <div class="form-group">
          <label for="customFile">Image</label>
          <div className="row" style={{ marginBottom: "5px" }}>
            {productPictures.length > 0
              ? productPictures.map((pic, index) => (
                  <img
                    id={index}
                    src={generatePublicUrl(pic.img)}
                    width="100"
                    height="100"
                    alt={`image product ${index}`}
                    aria-hidden
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </NewModal>
  );
};

export default ViewProductModal;

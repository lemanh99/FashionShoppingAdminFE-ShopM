import React, { useEffect, useState } from "react";
import NewModal from "../../../components/UI/Modal";
import Notification from "../../../components/UI/Notification";
const AddProductModal = (props) => {
  const [message, setMessage] = useState("");
  // const [listSelect, setListSelect] = useState([]);

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
    price,
    setPrice,
    quantity,
    setQuantity,
    discount,
    setDiscount,
    description,
    setDescription,
    brandId,
    setBrandId,
    listBrand,
    category,
    setCategory,
    listProduct,
    productPictures,
    listCategory,
    setProductPictures,
  } = props;
  // const check = () => {
  //   if (brandId === "") {
  //     setMessage("Require select brand");
  //     return false;
  //   }
  //   return true;
  // };
  const checkName = (value) => {
    const checkName = listProduct.find((product) => product.name === value);
    checkName ? setMessage("Name already exists") : setMessage("");
  };
  const handleProductPictures = (event) => {
    setProductPictures([...productPictures, event.target.files[0]]);
  };
  const selectCategory = (event) => {
    const value = event.target.value;
    setCategory(value);
    const lst = listBrand.filter((brand) => brand.categoryId === value);
    if (lst.length > 0) {
      // setListSelect(lst);
      setBrandId(lst[0]._id);
    } else {
      // setListSelect([]);
    }
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
              checkName(e.target.value);
              setName(e.target.value);
            }}
            required
          />
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                className="form-control"
                placeholder=""
                min="0"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div class="col-sm-4">
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                min="0"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div class="col-sm-4">
            <div className="form-group">
              <label>Discount(%)</label>
              <input
                type="number"
                className="form-control"
                min="0"
                value={discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
                }}
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                id="category"
                value={category}
                className="form-control"
                required
                onChange={(e) => selectCategory(e)}
              >
                <option value="">Select 1 category</option>
                {listCategory
                  ? listCategory.map((category) => (
                      <option value={category._id}>{category.name}</option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          <div class="col-sm-6">
            <div className="form-group">
              <label>Brand</label>
              <select
                name="brand"
                id="brand"
                value={brandId}
                className="form-control"
                required
                onChange={(e) => setBrandId(e.target.value)}
              >
                {category ? (
                  listBrand
                    .filter((brand) => brand.categoryId === category)
                    .map((brand) => (
                      <option value={brand._id}>{brand.name}</option>
                    ))
                ) : (
                  <option value="">Select 1 brand</option>
                )}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Enter description"
            rows="5"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="customFile">Image</label>
          <div className="row" style={{ marginBottom: "5px" }}>
            {productPictures.length > 0
              ? productPictures.map((pic, index) => (
                  <img
                    id={index}
                    src={!pic.img ? window.URL.createObjectURL(pic) : null}
                    width="100"
                    height="100"
                    alt={`image product ${index}`}
                    aria-hidden
                  />
                ))
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

export default AddProductModal;

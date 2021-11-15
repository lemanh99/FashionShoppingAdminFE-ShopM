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
    category,
    setCategory,
    descriptionDetail,
    setDescriptionDetail,
    descriptionList,
    setDescriptionList,
    searchWord,
    setSearchWord,
    productStatusId,
    setProductStatusId,
    listCategory,
    listProduct,
    listProductStatus,
    parentCategory, 
    setParentCategory,
    childCategory, 
    setChildCategory,
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
  const selectCategory = (event) => {
    const value = event.target.value;
    setParentCategory(value)
    const list = listCategory.find((category) => category.id === Number(value));
    setChildCategory(list.child_category)
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
          <div class="col-sm-6">
            <div className="form-group">
              <label>Category Parent</label>
              <select
                name="category"
                id="category"
                value={parentCategory}
                className="form-control"
                required
                onChange={(e) => selectCategory(e)}
              >
                {parentCategory == null ? (<option value="">Select 1 category</option>) : null}
                {listCategory
                  ? listCategory.map((category) =>
                    category.child_category.length > 0 ? (
                      <option value={category.id}>{category.category_name}</option>
                    ) : null)
                  : null}
              </select>
            </div>
          </div>
          <div class="col-sm-6">
            <div className="form-group">
              <label>Category Child</label>
              <select
                name="category"
                id="category"
                value={category}
                className="form-control"
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                {category == null ? (<option value="">Select 1 category</option>) : null}
                {childCategory
                  ? childCategory.map((category) => (
                    <option value={category.id}>{category.category_name}</option>
                  ))
                  : null}
              </select>
            </div>
          </div>

        </div>
        <div className="form-group">
          <label>Product status</label>
          <select
            name="category"
            id="category"
            value={productStatusId}
            className="form-control"
            required
            onChange={(e) => setProductStatusId(e.target.value)}
          >
            {productStatusId == null ? (<option value="">Select status</option>) : null}
            {listProductStatus[0]
              ? listProductStatus[0].data.map((status) => (
                <option value={status.id}>{status.name}</option>
              ))
              : null}
          </select>
        </div>
        <div className="form-group">
          <label>Description Detail</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Enter description"
            rows="5"
            value={descriptionDetail}
            onChange={(e) => {
              setDescriptionDetail(e.target.value);
            }}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Description List</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Enter description"
            rows="5"
            value={descriptionList}
            onChange={(e) => {
              setDescriptionList(e.target.value);
            }}
            required
          ></textarea>
        </div>
      </div>
    </NewModal>
  );
};

export default AddProductModal;

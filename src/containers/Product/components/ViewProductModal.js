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
    setName,
    category,
    setCategory,
    descriptionDetail,
    setDescriptionDetail,
    descriptionList,
    setDescriptionList,
    productStatusId,
    setProductStatusId,
    listCategory,
    listProduct,
    listProductStatus,
    parentCategory, 
    setParentCategory,
    childCategory, 
    setChildCategory,
    edit,
    setEdit,
  } = props;

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
      onSubmit={!edit ? (e) => setEdit(!edit) : onSubmit}
      buttonName={!edit ? "Edit" : "Save"}
      modalTitle={modalTitle}
    >
      <div className="card-body">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name brand"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            disabled={!edit}
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
                disabled={!edit}
              >
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
                className="form-control"
                required
                disabled={!edit}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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
            disabled={!edit}
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
            required
            disabled={!edit}
            onChange={(e) => {
              setDescriptionDetail(e.target.value);
            }}
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
            required
            onChange={(e) => {
              setDescriptionList(e.target.value);
            }}
            disabled={!edit}
          ></textarea>
        </div>
      </div>
    </NewModal>
  );
};

export default ViewProductModal;

import React, { useEffect, useState } from "react";
import NewModal from "../../../components/UI/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const ViewCouponModal = (props) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    setMessage("");
  }, []);
  const {
    show,
    handleClose,
    modalTitle,
    onSubmit,
    couponCode,
    setCouponCode,
    price,
    setPrice,
    quatity,
    setQuatity,
    expriedDate,
    setExpriedDate,
    limited,
    setLimited,
    edit,
    setEdit
  } = props;
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
          <label>Coupon code</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter couponCode"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value);
            }}
            required
            disabled={!edit}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            required
            disabled={!edit}
          />
        </div>
        <div className="form-group">
          <label>Limited</label>
          <select
            name="Limited"
            id="limited"
            value={limited}
            className="form-control"
            required
            disabled={!edit}
            onChange={(e) => setLimited(e.target.value)}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>

        {limited == "true" || limited == true ? (
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter quantity"
              value={quatity}
              onChange={(e) => {
                setQuatity(e.target.value);
              }}
              disabled={!edit}
              required
            />
          </div>
        ) : null}
        <div className="form-group">
          <label>Expried date</label>
          <div className="input-group date" id="reservationdate" data-target-input="nearest">
            <div className="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
              <DatePicker selectsStart={new Date()} startDate={new Date()} selected={expriedDate}  className="form-control datetimepicker-input" onChange={(date) => setExpriedDate(date)} />
              <div className="input-group-text"><i className="fa fa-calendar" /></div>
            </div>
          </div>
        </div>

      </div>
    </NewModal>
  );
};

export default ViewCouponModal;

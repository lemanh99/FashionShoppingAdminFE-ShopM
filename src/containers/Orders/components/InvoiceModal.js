import React from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { getAddressVietNam } from "../../../utils/address";
import { convert_date_from_timestamp } from "../../../utils/datetime";

const InvoiceModal = (props) => {
  const { order, customer, handleShiped, handleCancel, addressApi, trackingNumber, setTrackingNumber } = props;
  const print = () => {
    var content = document.getElementById("printarea");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };
  const shipping = order.shipping;
  const orderItems = order.order_item;
  const date = new Date();
  const handerDelivery = (e) => {
    if (trackingNumber !== "" || trackingNumber != null) {
      handleShiped(e)
    } else {
      toast.error("Tracking number required")
    }
  }
  return (
    <Modal size="xl" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Invoice</Modal.Title>
      </Modal.Header>
      <iframe
        title="Invoice"
        id="ifmcontentstoprintIfr"
        style={{
          height: "0px",
          width: "0px",
          position: "absolute",
        }}
      ></iframe>
      <Modal.Body id="printarea">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="invoice p-3 mb-3">
                  {/* title row */}
                  <div className="row">
                    <div className="col-12">
                      <h4>
                        <i className="fas fa-globe" /> ShopM
                        <small className="float-right">
                          Date:{" "}
                          {('0' + date.getDate()).slice(-2) +
                            "/" +
                            ('0' + (date.getMonth() + 1)).slice(-2) +
                            "/" +
                            date.getFullYear()}
                        </small>
                      </h4>
                    </div>
                    {/* /.col */}
                  </div>
                  {/* info row */}
                  <div className="row invoice-info">
                    <div className="col-sm-4 invoice-col">
                      From
                      <address>
                        <strong>ShopM</strong>
                        <br />
                        Da Nang City, Viet Nam
                        <br />
                        Phone: 082292000
                        <br />
                        Email: info@shopm.com
                      </address>
                    </div>
                    {/* /.col */}
                    <div className="col-sm-4 invoice-col">
                      To
                      <address>
                        <strong>
                          {shipping ? (shipping.first_name + " " + shipping.last_name) : null}
                        </strong>
                        <br />
                        Address: {shipping ? (shipping.street + "," + getAddressVietNam(addressApi, shipping.city, shipping.district, shipping.village)) : null}
                        <br />
                        Phone:{" "}
                        {shipping ? (shipping.phone_number) : null}
                        <br />
                        Email:{" "} {shipping ? (shipping.email) : null}
                      </address>
                    </div>
                    {/* /.col */}
                    <div className="col-sm-4 invoice-col">
                      {/* <b>Invoice #007612</b> */}
                      <br />
                      <br />
                      <b>Order ID:{" "}</b> {order.order_code}
                      <br />
                      <b>Order date:{" "}</b> {convert_date_from_timestamp(order.order_date)}
                      <br />
                    </div>
                    {/* /.col */}
                  </div>

                  <div className="row">
                    <div className="col-12 table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItems
                            ? orderItems.map((product, index) => (
                              <tr>
                                <td>{index}</td>
                                <td><a href={`http://localhost:3000/shop/${product.slug}`} target="_blank">{product.product_name}</a></td>
                                <td>{product.quantity}</td>

                                <td>{product.price}</td>
                              </tr>
                            ))
                            : null}
                        </tbody>
                      </table>
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                  <div className="row">
                    <div className="col-6">
                      <p>
                        <b>Payment Methods:{" "}</b>

                        {order.payment_method === "COD"
                          ? "Cash to deliver"
                          : order.payment_method}
                      </p>
                      <p>
                        <b>Payment Status :{" "}</b>

                        {order.payment_status_name}
                      </p>
                      <p>
                        <b>Order Status :{" "}</b>
                        {order.order_status_name}
                      </p>
                      <p>
                        <b>Delivery name :{" "}</b>
                        {order.shipping?order.shipping.delivery_name:null}
                      </p>
                    </div>
                    {/* /.col */}
                    <div className="col-6">
                      {/* <p className="lead">Amount Due 2/22/2014</p> */}
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>
                            <tr>
                              <th>Total:</th>
                              <td>{order.subtotal}VND</td>
                            </tr>


                            <tr>
                              <th>Fee Shipping:</th>
                              <td>{order.delivery_fee_total}VND</td>
                            </tr>
                            <tr>
                              <th style={{ width: "50%" }}>Subtotal:</th>
                              <td>{order.payment_total}VND</td>
                            </tr>
                          </tbody>
                        </table>
                        {shipping ? (
                          Number(shipping.shipping_status_id) === 1 ? (
                            <div className="table" style={{ padding: '10px' }}>
                              <div className="form-group">
                                <label>Tracking number</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter tracking number"
                                  value={trackingNumber}
                                  onChange={(e) => {
                                    setTrackingNumber(e.target.value);
                                  }}
                                  required
                                />
                              </div>
                            </div>
                          ) : null
                        ) : null}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <div className="row no-print">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-warning float-right"
              style={{ marginRight: "5px" }}
              onClick={props.handleClose}
            >
              <i className="fas fa-backspace" /> Back
            </button>
            {shipping ? (
              Number(shipping.shipping_status_id) === 1 ? (
                <>
                  <button
                    type="button"
                    className="btn btn-danger float-right"
                    style={{ marginRight: "5px" }}
                    value={order.id}
                    onClick={handleCancel}
                  >
                    <i className="fas fa-trash" /> Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success float-right"
                    style={{ marginRight: "5px" }}
                    value={order.id}
                    onClick={handleShiped}
                  >
                    <i className="far fa-credit-card" /> Delivery
                  </button>
                </>
              ) : null
            ) : null}

            <button
              type="button"
              className="btn btn-primary float-right"
              style={{ marginRight: "5px" }}
              onClick={print}
            >
              <i className="fas fa-print" /> Print
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default InvoiceModal;
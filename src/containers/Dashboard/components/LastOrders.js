import React from "react";
import { Link } from "react-router-dom";

const LastOrders = (props) => {
  const { order } = props;
  return (
    <div className="card">
      <div className="card-header border-transparent">
        <h3 className="card-title">Latest Orders</h3>
        <div className="card-tools">
          <span className="badge badge-warning">{order && order.total_items ? order.total_items : 0} New Order</span>
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
          >
            <i className="fas fa-minus" />
          </button>
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="remove"
          >
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      {/* /.card-header */}
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table m-0">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Subtotal Payment</th>
              </tr>
            </thead>
            <tbody>
              {order && order.items ? (
                order.items
                  .map((order) => {
                    return (
                      <tr>
                        <td>{order.order_code}</td>
                        <td>{order.subtotal} VND</td>
                      </tr>
                    );
                  })) : null}
            </tbody>
          </table>
        </div>
        {/* /.table-responsive */}
      </div>
      {/* /.card-body */}
      <div className="card-footer text-center">
        <Link to={`/manage-order`}>View All Orders</Link>
      </div>
      {/* /.card-footer */}
    </div>
  );
};

export default LastOrders;

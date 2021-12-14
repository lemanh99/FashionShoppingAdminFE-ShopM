import React from "react";
import { Link } from "react-router-dom";
import { convert_date_from_timestamp } from "../../../utils/datetime";

const LastMember = (props) => {
  const { customer } = props;
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Latest Customers</h3>
        <div className="card-tools">
          <span className="badgebadge-danger">{customer && customer.total_items ? customer.total_items : 0} New Customer</span>
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
        <ul className="users-list clearfix">
          {customer && customer.items ? (
            customer.items
              .map((customer) => {
                return (
                  <li>
                    <img
                      src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png"
                      aria-hidden
                      alt="User Image"
                    />
                    <div className="users-list-name">{customer.full_name}</div>
                    <span className="users-list-date">
                      {convert_date_from_timestamp(customer.created_at)}
                    </span>
                  </li>
                );
              })) : null}
        </ul>
        {/* /.users-list */}
      </div>
      {/* /.card-body */}
      <div className="card-footer text-center">
        <Link to={`/manage-customer`}>View All Users</Link>
      </div>
      {/* /.card-footer */}
    </div>
  );
};

export default LastMember;

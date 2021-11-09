import React from "react";
import { Link } from "react-router-dom";

const LastMember = (props) => {
  const { customer } = props;
  const convert = (string) => {
    var times = new Date(string);
    return times.getDate() + "/" + times.getMonth();
  };
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Latest Members</h3>
        <div className="card-tools">
          <span className="badge badge-danger">8 New Members</span>
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
          {customer.listCustomer
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 8)
            .map((customer) => {
              return (
                <li>
                  <img
                    src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png"
                    aria-hidden
                    alt="User Image"
                  />
                  <div className="users-list-name">{customer.firstName +" "+customer.lastName}</div>
                  <span className="users-list-date">
                    {convert(customer.createdAt)}
                  </span>
                </li>
              );
            })}
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

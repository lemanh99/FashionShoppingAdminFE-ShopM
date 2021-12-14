import React from "react";
import { Link } from "react-router-dom";
import { generatePublicUrl } from "../../../urlConfig";

const LastProduct = (props) => {
  const { product } = props;
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Recently Added Products</h3>
        <div className="card-tools">
          <span className="badge badge-warning">{product && product.total_items ? product.total_items : 0} New Product</span>
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
        <ul className="products-list product-list-in-card pl-2 pr-2">
          {product && product.items ? (product.items
            .map((product) => {
              return (
                <li className="item">
                  <div className="product-info">
                    <div className="product-title">
                      <a href={`http://localhost:3000/shop/${product.id}`} target="_blank">{product.name}</a>
                      <span className="badge badge-warning float-right">
                        {product.status_name}
                      </span>
                    </div>
                    <span className="product-description">
                      Category: {product.category_name}
                    </span>
                  </div>
                </li>
              );
            })) : null}
        </ul>
      </div>

      {/* /.card-body */}
      <div className="card-footer text-center">
        <Link to={`/manage-product`}>View All Products</Link>
      </div>
      {/* /.card-footer */}
    </div>
  );
};

export default LastProduct;

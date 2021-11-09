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
          {product.listProduct
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 4)
            .map((product) => {
              return (
                <li className="item">
                  <div className="product-img">
                    <img
                      src={
                        product.productPictures
                          ? generatePublicUrl(product.productPictures[0].img)
                          : ""
                      }
                      aria-hidden
                      alt="Product Image"
                      className="img-size-50"
                    />
                  </div>
                  <div className="product-info">
                    <div className="product-title">
                      {product.name}
                      <span className="badge badge-warning float-right">
                        ${product.price}
                      </span>
                    </div>
                    <span className="product-description">
                      {product.description}
                    </span>
                  </div>
                </li>
              );
            })}
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

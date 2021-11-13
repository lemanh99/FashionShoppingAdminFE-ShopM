import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  addProductSku,
  deleteProductSku,
  getListProduct,
  getListProductSku,
  getListProductSkuByProductId,
  updateProductSku,
} from "../../actions";
import { getColor, getSize } from "../../actions/Master/master.action";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";
import { convert_datetime_from_timestamp } from "../../utils";
import AddProductSkuModal from "./components/AddProductSkuModal";
import EditProductSkuModal from "./components/EditProductSkuModal";
import ViewProductSkuModal from "./components/ViewProductSkuModal";

const ProductSku = (props) => {
  const product_id = props.match.params.id

  const product_skus = useSelector((state) => state.product_sku);
  const products = useSelector((state) => state.product);
  const brands = useSelector((state) => state.brand);
  const categories = useSelector((state) => state.category);
  const listSize = useSelector((state) => state.master.size)
  const listColor = useSelector((state) => state.master.color)

  const [productId, setProductId] = useState([]);
  const [productSkuId, setProductSkuId] = useState(null);
  const [productName, setProductName] = useState(null);
  const [dataProductSku, setDataProductSku] = useState([]);
  const [stock, setStock] = useState(null);
  const [price, setPrice] = useState(null);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [imageSku, setImageSku] = useState([]);
  const [imageSkuShow, setImageSkuShow] = useState(null);
  const [listProductSku, setListProductSku] = useState([]);
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListProductSkuByProductId(product_id))
    dispatch(getSize())
    dispatch(getColor())
  }, [dispatch]);

  useEffect(() => {
    setMessage(product_skus.messages);
  }, [product_skus.messages]);

  useEffect(() => {
    setListProductSku(product_skus.listProductSku);

  }, [product_skus.listProductSku]);
  //show Modal
  useEffect(() => {
    setDatatable();
  }, [listProductSku])

  const handleShowAdd = () => {
    setProductId(null);
    setStock(null);
    setPrice(null);
    setSize(null);
    setColor(null);
    setImageSku([])
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    const form = new FormData();
    form.append("product_id", product_id);
    form.append("stock", stock);
    form.append("price", price);
    form.append("size", size);
    form.append("color", color);
    form.append("image", imageSku[0]);
    dispatch(addProductSku(form)).then(() => {
      dispatch(getListProductSkuByProductId(product_id));
    });
    setShowAdd(false);
    setProductId(null);
    setStock(null);
    setPrice(null);
    setSize(null);
    setColor(null);
    setImageSku([])
  };

  const handleShowView = (e) => {
    const prod = product_skus.listProductSku.find(
      (product_sku) => product_sku.id === Number(e.target.value)
    );
    if (prod) {
      setProductName(prod.product_name);
      setStock(prod.stock);
      setPrice(prod.price);
      setSize(prod.size_id);
      setColor(prod.color_id);
      setImageSkuShow(prod.image.url)
    }
    setShowView(true);
  };

  const handleCloseView = () => {
    setProductId(null);
    setStock(null);
    setPrice(null);
    setSize(null);
    setColor(null);
    setImageSku([]);
    setImageSkuShow(null);
    setShowView(false);
  };

  const handleShowDelete = (event) => {
    const id = event.target.value;
    const prod = product_skus.listProductSku.find((product) => product._id === id);
    // setProduct(prod);
    // setName(prod.name);
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    dispatch(deleteProductSku(product._id));
    setProduct({});
    setShowDeleteModal(false);
    setMessage("Delete Successfully!");
  };
  const handleShowEdit = (event) => {
    const id = event.target.value;
    const prod = product_skus.listProductSku.find((product_sku) => product_sku.id === Number(id));
    if (prod) {
      setProductSkuId(id);
      setStock(prod.stock);
      setPrice(prod.price);
      setSize(prod.size_id);
      setColor(prod.color_id);
      setImageSku([]);
    }
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    const form = new FormData();
    form.append("id", productSkuId)
    form.append("product_id", product_id)
    form.append("stock", stock);
    form.append("price", price);
    form.append("size", size);
    form.append("color", color);
    if (imageSku.length > 0) {
      form.append("image", imageSku[0]);
    }
    dispatch(updateProductSku(form)).then(() => {
      dispatch(getListProductSkuByProductId(product_id));
    });
    setShowEditModal(false);
    setProductSkuId(null)
    setProductId(null);
    setStock(null);
    setPrice(null);
    setSize(null);
    setColor(null);
    setImageSku([])
  };

  //selected
  const searchList = (event) => {
    const value = event.target.value;
    setSearch(value);
    let listSearch;
    if (value === "") {
      setListProductSku(product_skus.listProductSku);
    } else {
      const prod = product_skus.listProductSku.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setListProductSku(prod);
    }
  };
  // const convert_data = (timestamp) => {
  //   const date = convert_datetime_from_timestamp(timestamp)
  //   return date
  // }
  const handerBack = (event) => {
    setListProductSku([])
    setDataProductSku([])
    props.history.push("/manage-product")
  }

  //row table
  const rowTable = (product_skus) => {
    const all = [];
    for (let [index, product_sku] of product_skus.entries()) {
      var element = {
        sr: index + 1,
        name: product_sku.product_name,
        quantity: product_sku.stock,
        price: product_sku.price,
        size: product_sku.size,
        color: product_sku.color,
        image: (
          <img
            src={product_sku.image.url}
            alt={product_sku.image.file_name}
            width="50"
            height="50"
          ></img>
        ),
        btn: (
          <div class="project-actions  text-center">
            <button
              class="btn btn-primary btn-sm"
              value={product_sku.id}
              onClick={handleShowView}
              style={{ marginRight: "5px" }}
            >
              <i class="fas fa-folder"></i>
              View
            </button>
            <button
              class="btn btn-info btn-sm"
              value={product_sku.id}
              onClick={handleShowEdit}
              style={{ marginRight: "5px" }}
            >
              <i class="fas fa-pencil-alt"></i>
              Edit
            </button>
            <button
              class="btn btn-danger btn-sm"
              value={product_sku.id}
              onClick={handleShowDelete}
              style={{ marginRight: "5px" }}
            >
              <i class="fas fa-trash"></i>
              Delete
            </button>
          </div>
        ),
      };
      all.push(element);
    }
    return all;
  };
  const setDatatable = () => {
    const data = {
      columns: [
        {
          label: "No.",
          field: "sr",
          sort: "asc",
          width: 150,
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
          width: 200,
        },
        {
          label: "Quantity",
          field: "quantity",
          sort: "asc",
          width: 50,
        },
        {
          label: "Price(VND)",
          field: "price",
          sort: "asc",
          width: 50,
        },
        {
          label: "Size",
          field: "size",
          sort: "asc",
          width: 50,
        },
        {
          label: "Color",
          field: "color",
          sort: "asc",
          width: 50,
        },
        {
          label: "Image",
          field: "image",
          sort: "asc",
          width: 50,
        },
        {
          label: "",
          field: "btn",
          sort: "asc",
          width: 100,
        },
      ],
      rows: rowTable(listProductSku),
    };
    setDataProductSku(data);
  }

  return (
    <Layout title="Manage product">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="card">
                <div className="card-header">
                  <div class="card-title">
                    <button onClick={(e) => { handerBack(e) }}
                      className="btn btn-block bg-gradient-primary"
                    >
                      Back
                    </button>
                  </div>
                  <div style={{ float: "right" }}>
                    <div className="row">
                      <button
                        className="btn btn-block bg-gradient-primary"
                        onClick={handleShowAdd}
                      >
                        New A Product SKU
                      </button>

                    </div>
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div style={{ marginTop: "5px", marginBottom: "-67px" }}>
                    {message !== "" ? (
                      brands.error !== "" ? (
                        <Notification type="danger" message={message} />
                      ) : (
                        <Notification type="success" message={message} />
                      )
                    ) : null}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "-80px" }}>
                  <div className="col-lg-12">
                    <div className="" style={{ float: "right" }}>
                      <div className="card-body">
                        <div className="input-group">
                          <div class="input-group-append">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search name"
                              value={search}
                              onChange={(e) => {
                                searchList(e);
                              }}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="card-body">
                    <MDBDataTable
                      entries={5}
                      // displayEntries={false}
                      entriesOptions={[5, 10, 15, 20, 25, 50]}
                      searching={false}
                      striped
                      bordered
                      hover
                      // barReverse
                      noBottomColumns
                      data={dataProductSku}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </section>

      <AddProductSkuModal
        show={showAdd}
        handleClose={() => {
          setShowAdd(false);
        }}
        onSubmit={handleCloseAdd}
        modalTitle={"Add New Product Sku"}
        stock={stock}
        setStock={setStock}
        price={price}
        setPrice={setPrice}
        size={size}
        setSize={setSize}
        color={color}
        listSize={listSize}
        listColor={listColor}
        setColor={setColor}
        imageSku={imageSku}
        setImageSku={setImageSku}
        listProductSku={listProductSku}
      />
      <ViewProductSkuModal
        show={showView}
        handleClose={handleCloseView}
        onSubmit={handleCloseView}
        modalTitle={"Product"}
        stock={stock}
        setStock={setStock}
        price={price}
        setPrice={setPrice}
        size={size}
        setSize={setSize}
        color={color}
        listSize={listSize}
        listColor={listColor}
        setColor={setColor}
        imageSku={imageSkuShow}
        listProductSku={listProductSku}
      />
      {/* <DeleteProductModal
        show={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
          // setProduct({});
          // setName("");
        }}
        modalTitle={"Delete Product"}
        onSubmit={handleCloseDelete}
        // name={name}
      /> */}
      <EditProductSkuModal
        show={showEditModal}
        handleClose={() => {
          setShowEditModal(false);
        }}
        onSubmit={handleCloseEdit}
        modalTitle={"Edit Product Sku"}
        stock={stock}
        setStock={setStock}
        price={price}
        setPrice={setPrice}
        size={size}
        setSize={setSize}
        color={color}
        listSize={listSize}
        listColor={listColor}
        setColor={setColor}
        imageSku={imageSku}
        setImageSku={setImageSku}
        listProductSku={listProductSku}
        listProductSku={listProductSku}
      />
    </Layout>
  );
};

export default ProductSku;

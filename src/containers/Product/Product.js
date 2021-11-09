import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addProduct,
  deleteProduct,
  getListCategory,
  getListProduct,
  updateProduct,
} from "../../actions";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";
import { convert_datetime_from_timestamp } from "../../utils";
import AddProductModal from "./components/AddProductModal";
import DeleteProductModal from "./components/DeleteProductModal";
import EditProductModal from "./components/EditProductModal";
import ViewProductModal from "./components/ViewProductModal";

const Product = () => {
  const products = useSelector((state) => state.product);
  const brands = useSelector((state) => state.brand);
  const categories = useSelector((state) => state.category);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [reviews, setReviews] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [category, setCategory] = useState("");
  const [brandId, setBrandId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  //entries
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListProduct());
  }, [dispatch]);
  useEffect(() => {
    setMessage(products.messages);
  }, [products.messages]);
  useEffect(() => {
    setListProduct(products.listProduct);
    setListBrand(brands.listBrand);
    setListCategory(categories.listCategory);
  }, [products.listProduct, brands.listBrand, categories.listCategory]);
  //show Modal

  const handleShowAdd = () => {
    setName("");
    setPrice(0);
    setDiscount(0);
    setQuantity(0);
    setBrandId("");
    setDescription("");
    setProductPictures([]);
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    const form = new FormData();
    console.log(price, quantity, discount, description, brandId);
    form.append("name", name);
    form.append("price", price);
    form.append("discount", discount);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("brandId", brandId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));
    setShowAdd(false);
    setName("");
    setPrice(0);
    setQuantity(0);
    setDescription("");
    setBrandId("");
    setProductPictures([]);
  };

  const handleShowView = (e) => {
    const prod = products.listProduct.find(
      (product) => product._id === e.target.value
    );
    setName(prod.name);
    setPrice(prod.price);
    setDiscount(prod.discount);
    setQuantity(prod.quantity);
    const bra = brands.listBrand.find((brand) => brand._id === prod.brandId);
    setBrandId(bra.name);
    const cat = categories.listCategory.find(
      (category) => category._id === bra.categoryId
    );
    setCategory(cat.name);
    setReviews(prod.reviews);
    setDescription(prod.description);
    setProductPictures(prod.productPictures);
    setShowView(true);
  };
  const handleCloseView = () => {
    setName("");
    setPrice(0);
    setDiscount(0);
    setQuantity(0);
    setBrandId("");
    setDescription("");
    setReviews("");
    setCategory("");
    setProductPictures([]);
    setShowView(false);
  };

  const handleShowDelete = (event) => {
    const id = event.target.value;
    const prod = products.listProduct.find((product) => product._id === id);
    setProduct(prod);
    setName(prod.name);
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    dispatch(deleteProduct(product._id));
    setProduct({});
    setShowDeleteModal(false);
    setMessage("Delete Successfully!");
  };
  const handleShowEdit = (event) => {
    const id = event.target.value;
    const prod = products.listProduct.find((product) => product._id === id);
    setProduct(prod);
    setName(prod.name);
    setPrice(prod.price);
    setDiscount(prod.discount);
    setQuantity(prod.quantity);
    const bra = brands.listBrand.find((brand) => brand._id === prod.brandId);
    setBrandId(prod.brandId);
    const cat = categories.listCategory.find(
      (category) => category._id === bra.categoryId
    );
    setCategory(cat._id);
    setReviews(prod.reviews);
    setDescription(prod.description);
    setProductPictures([]);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    const form = new FormData();
    form.append("id", product._id);
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("brandId", brandId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(updateProduct(form));
    setProduct({});
    setName("");
    setPrice(0);
    setQuantity(0);
    setDiscount(0);
    setDescription("");
    setBrandId("");
    setProductPictures([]);
    setShowEditModal(false);
    setMessage("Edit Successfully!");
  };

  const selectList = (event) => {
    const value = event.target.value;
    setSelectedBrand(value);

    let list = [];
    if (value) {
      list = list.concat(
        products.listProduct.filter((product) =>
          product.brandId.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      const lstBrand = brands.listBrand.filter((brand) =>
        brand.categoryId.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      for (let bra of lstBrand) {
        list = list.concat(
          products.listProduct.filter((product) =>
            product.brandId.toLowerCase().includes(bra._id.toLowerCase())
          )
        );
      }
    }
    setListProduct(list);
  };
  //selected
  const searchList = (event) => {
    const value = event.target.value;
    setSearch(value);
    let listSearch;
    if (value === "") {
      setListProduct(products.listProduct);
    } else {
      const prod = products.listProduct.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setListProduct(prod);
    }
  };
  // const convert_data = (timestamp) => {
  //   const date = convert_datetime_from_timestamp(timestamp)
  //   return date
  // }

  //row table
  const rowTable = (products) => {
    const all = [];
    for (let [index, product] of products.entries()) {
      var element = {
        sr: index + 1,
        name: <Link to={`/manage-product-sku/${product.id}`}>{product.name}</Link>,
        price: product.price,
        status: product.status_name,
        create_date: convert_datetime_from_timestamp(product.created_at),
        update_date: convert_datetime_from_timestamp(product.updated_at),
        btn: (
          <div class="project-actions  text-center">
            <button
              class="btn btn-primary btn-sm"
              value={product._id}
              onClick={handleShowView}
              style={{ marginRight: "5px" }}
            >
              <i class="fas fa-folder"></i>
              View
            </button>
            <button
              class="btn btn-info btn-sm"
              value={product._id}
              onClick={handleShowEdit}
              style={{ marginRight: "5px" }}
            >
              <i class="fas fa-pencil-alt"></i>
              Edit
            </button>
            <button
              class="btn btn-danger btn-sm"
              value={product._id}
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
  const data = {
    columns: [
      {
        label: "No.",
        field: "sr",
        sort: "asc",
        width: 150,
      },
      {
        label: "Category",
        field: "category",
        sort: "asc",
        width: 200,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 200,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 50,
      },
      {
        label: "Create date",
        field: "create_date",
        sort: "asc",
        width: 200,
      },
      {
        label: "Update_date",
        field: "update_date",
        sort: "asc",
        width: 200,
      },
      {
        label: "",
        field: "btn",
        sort: "asc",
        width: 100,
      },
    ],
    rows: rowTable(listProduct),
  };

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
                    <button
                      className="btn btn-block bg-gradient-primary"
                      onClick={handleShowAdd}
                    >
                      New A Product
                    </button>
                  </div>
                  <div style={{ float: "right" }}>
                    <div className="row">
                      <div className="col-md-6">
                        <select
                          className="form-control "
                          value={selectedBrand}
                          style={{ backgroundColor: "#e9ecef" }}
                          onChange={(e) => selectList(e)}
                        >
                          <option value="">Select Brand</option>
                          {listBrand
                            .filter((brand) =>
                              brand.categoryId
                                .toLowerCase()
                                .includes(selectedCategory.toLowerCase())
                            )
                            .map((brand) => (
                              <option value={brand._id}>{brand.name}</option>
                            ))}
                          <option value="">All</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <select
                          className="form-control "
                          value={selectedCategory}
                          style={{ backgroundColor: "#e9ecef", width: "164px" }}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="">Select Category</option>
                          cat
                          {listCategory
                            ? listCategory.map((category) => (
                                <option value={category._id}>
                                  {category.name}
                                </option>
                              ))
                            : null}
                          <option value="">All</option>
                        </select>
                      </div>
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
                      data={data}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </section>

      <AddProductModal
        show={showAdd}
        handleClose={() => {
          setShowAdd(false);
          setProductPictures([]);
        }}
        onSubmit={handleCloseAdd}
        modalTitle={"Add New Product"}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        quantity={quantity}
        setQuantity={setQuantity}
        discount={discount}
        setDiscount={setDiscount}
        description={description}
        setDescription={setDescription}
        brandId={brandId}
        category={category}
        setCategory={setCategory}
        setBrandId={setBrandId}
        listBrand={listBrand}
        productPictures={productPictures}
        listCategory={listCategory}
        setProductPictures={setProductPictures}
        listProduct={listProduct}
      />
      <ViewProductModal
        show={showView}
        handleClose={handleCloseView}
        onSubmit={handleCloseView}
        modalTitle={"Product"}
        name={name}
        price={price}
        quantity={quantity}
        discount={discount}
        description={description}
        brandId={brandId}
        category={category}
        listBrand={listBrand}
        productPictures={productPictures}
        listCategory={listCategory}
        listProduct={listProduct}
      />
      <DeleteProductModal
        show={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
          setProduct({});
          setName("");
        }}
        modalTitle={"Delete Product"}
        onSubmit={handleCloseDelete}
        name={name}
      />
      <EditProductModal
        show={showEditModal}
        handleClose={() => {
          setShowEditModal(false);
          setProduct({});
        }}
        onSubmit={handleCloseEdit}
        modalTitle={"Edit Product"}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        quantity={quantity}
        setQuantity={setQuantity}
        discount={discount}
        setDiscount={setDiscount}
        description={description}
        setDescription={setDescription}
        brandId={brandId}
        category={category}
        setCategory={setCategory}
        setBrandId={setBrandId}
        listBrand={listBrand}
        productPictures={productPictures}
        listCategory={listCategory}
        setProductPictures={setProductPictures}
        listProduct={listProduct}
      />
    </Layout>
  );
};

export default Product;

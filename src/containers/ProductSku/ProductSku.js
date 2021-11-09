import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductSku,
  deleteProductSku,
  getListProductSku,
  getListProductSkuByProductId,
  updateProductSku,
} from "../../actions";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";
import { convert_datetime_from_timestamp } from "../../utils";
import AddProductModal from "../Product/components/AddProductModal";
import DeleteProductModal from "../Product/components/DeleteProductModal";
import EditProductModal from "../Product/components/EditProductModal";
import ViewProductModal from "../Product/components/ViewProductModal";

const ProductSku = (props) => {
  const product_id = props.match.params.id

  const product_skus = useSelector((state) => state.product_sku);
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
    dispatch(getListProductSkuByProductId(product_id));
  }, [dispatch]);

  useEffect(() => {
    setMessage(product_skus.messages);
  }, [product_skus.messages]);
  
  useEffect(() => {
    setListProductSku(product_skus.listProductSku);
    console.log(product_skus)
  }, [product_skus.listProductSku]);
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
    dispatch(addProductSku(form));
    setShowAdd(false);
    setName("");
    setPrice(0);
    setQuantity(0);
    setDescription("");
    setBrandId("");
    setProductPictures([]);
  };

  const handleShowView = (e) => {
    const prod = product_skus.listProductSku.find(
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
    const prod = product_skus.listProductSku.find((product) => product._id === id);
    setProduct(prod);
    setName(prod.name);
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
    const prod = product_skus.listProductSku.find((product) => product._id === id);
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
    dispatch(updateProductSku(form));
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

  //row table
  const rowTable = (product_skus) => {
    const all = [];
    for (let [index, product_sku] of product_skus.entries()) {
      var element = {
        sr: index + 1,
        name: product_sku.product_name,
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
                      New A Product SKU
                    </button>
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
        productPictures={productPictures}
        setProductPictures={setProductPictures}
        listProductSku={listProductSku}
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
        productPictures={productPictures}
        listProductSku={listProductSku}
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
        productPictures={productPictures}
        setProductPictures={setProductPictures}
        listProductSku={listProductSku}
      />
    </Layout>
  );
};

export default ProductSku;

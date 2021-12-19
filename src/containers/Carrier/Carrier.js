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
import { getProductStatus } from "../../actions/Master/master.action";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";
import axiosIntance from "../../helpers/axios";
import { convert_datetime_from_timestamp } from "../../utils";
// import AddProductModal from "./components/AddProductModal";
// import DeleteProductModal from "./components/DeleteProductModal";
// import EditProductModal from "./components/EditProductModal";
// import ViewProductModal from "./components/ViewProductModal";

const Carrier = () => {
  const products = useSelector((state) => state.product);
  const brands = useSelector((state) => state.brand);
  const categories = useSelector((state) => state.category);
  const listProductStatus = useSelector((state) => state.master.product_status)

  const [listProduct, setListProduct] = useState([])
  const [status, setStatus] = useState([])
  const [name, setName] = useState(null);
  const [category, setCategory] = useState([])
  const [descriptionDetail, setDescriptionDetail] = useState(null);
  const [descriptionList, setDescriptionList] = useState(null);
  const [searchWord, setSearchWord] = useState(null)
  const [productStatusId, setProductStatusId] = useState(null)
  const [listCategory, setListCategory] = useState([]);
  const [listStatus, setListStatus] = useState([]);
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState(null);
  const [message, setMessage] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [parentCategory, setParentCategory] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [dataTable, setDataTable] = useState([])
  const [edit, setEdit] = useState(false);

  const [showView, setShowView] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  //entries
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListProduct());
    dispatch(getProductStatus())
    dispatch(getListCategory());
    setSelectedCategory("");
    setSelectedStatus("");
    setSearch("");
  }, [dispatch]);
  useEffect(() => {
    setMessage(products.messages);
  }, [products.messages]);
  useEffect(() => {
    setListProduct(products.listProduct);
    setListCategory(categories.listCategory);
    if (listProductStatus && listProductStatus.length > 0) {
      setListStatus(listProductStatus[0].data)
    }
  }, [products.listProduct, categories.listCategory, listProductStatus]);
  //show Modal

  const handleShowAdd = () => {
    setName(null);
    setCategory([])
    setDescriptionDetail(null);
    setDescriptionList(null);
    setSearchWord(null);
    setProductStatusId(null);
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    const product = {
      "name": name,
      "category": [category],
      "description_detail": descriptionDetail,
      "description_list": descriptionList,
      "search_word": searchWord,
      "product_status_id": productStatusId,
    }
    dispatch(addProduct(product)).then(() => {
      dispatch(getListProduct())
    });
    setShowAdd(false);
    setName(null);
    setCategory([])
    setDescriptionDetail(null);
    setDescriptionList(null);
    setSearchWord(null);
    setProductStatusId(null);
    setChildCategory([])
    setParentCategory([])
  };

  const handleShowView = (e) => {
    const id = e.target.value
    setProductId(id);
    axiosIntance.get(`product/detail/${id}`).then((res) => {
      const { data } = res.data;
      console.log(data);
      if (data) {
        setName(data.name);

        const list = listCategory.find((category) => {
          const filter = category.child_category.find((child) => child.id === Number(data.category[0]))
          if (filter) return true;
          return false;
        });
        setParentCategory(list ? list.id : "");
        setChildCategory(list ? list.child_category : [])
        setCategory(data.category[0]);
        setDescriptionDetail(data.description_detail);
        setDescriptionList(data.description_list);
        setSearchWord(data.search_word);
        setProductStatusId(data.product_status_id);
        setShowView(true);
      }
    })


  };
  const handleCloseView = () => {
    setName(null);
    setCategory([])
    setDescriptionDetail(null);
    setDescriptionList(null);
    setSearchWord(null);
    setProductStatusId(null);
    setChildCategory([])
    setParentCategory([])
    setEdit(false);
    setShowView(false);
  };

  const handleShowDelete = (event) => {
    const id = event.target.value;
    console.log(id);
    const prod = products.listProduct.find((product) => Number(product.id)=== Number(id));
    console.log(prod);
    if(prod){
      setProduct(prod);
      setName(prod.name);
      setShowDeleteModal(true);
    }
  };

  const handleCloseDelete = (e) => {
    dispatch(deleteProduct(product.id)).then(() => {
      // dispatch(getListProduct());
      handerFilter(e, "other")
    });
    setProduct({});
    setShowDeleteModal(false);
  };
  const handleShowEdit = (event) => {
    const id = event.target.value;
    const prod = products.listProduct.find((product) => product._id === id);
    setProduct(prod);
    setName(prod.name);
    setCategory(prod.category);
    setDescriptionDetail(prod.description_detail);
    setDescriptionList(prod.description_list);
    setSearchWord(prod.search_word);
    setProductStatusId(prod.product_status_id);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    const product = {
      "id": productId,
      "name": name,
      "category": [category],
      "description_detail": descriptionDetail,
      "description_list": descriptionList,
      "search_word": searchWord,
      "product_status_id": productStatusId,
    }
    dispatch(updateProduct(product));
    // setProduct({});
    // setName(null);
    // setProductId(null);
    // setCategory([]);
    // setDescriptionDetail(null);
    // setDescriptionList(null);
    // setSearchWord(null);
    // setProductStatusId(null);
    // setChildCategory([])
    // setParentCategory([])
    setEdit(false);
    setShowEditModal(false);
  };

  const handerFilter = (e, type) => {
    e.preventDefault();
    var data_filter = {
      category_parent_id: selectedCategory,
      product_status: selectedStatus,
      search_keyword: search
    }
    let data = {}
    switch (type) {
      case "status": {
        data = {
          ...data_filter,
          product_status: e.target.value
        }
        // do some thing
        break;
      }
      case "category": {
        // do some thing
        data = {
          ...data_filter,
          category_parent_id: e.target.value
        }
        break;
      }
      case "search": {
        // do some thing
        data = {
          ...data_filter,
          search_keyword: e.target.value
        }
        break;
      }
      default: {
        data = {
          ...data_filter
        }
        // do something
      }
    }
    dispatch(getListProduct(data))
  }
  useEffect(() => {
    settingDatatable();
  }, [listProduct])

  const rowTable = (products) => {
    const all = [];
    for (let [index, product] of products.entries()) {
      var element = {
        sr: index + 1,
        name: <Link to={`/manage-product-sku/${product.id}`}>{product.name}</Link>,
        category: product.category_name,
        status: product.status_name,
        create_date: convert_datetime_from_timestamp(product.created_at),
        update_date: convert_datetime_from_timestamp(product.updated_at),
        btn: (
          <div className="row" style={{ width: '86px' }}>
            <div class="project-actions  text-center">
              {/* <a
                class="card-title"
                value={product.id}
                onClick={handleShowView}
                style={{ marginRight: "5px" }}
              >
                <i class="fas fa-folder fa-lg" value={product.id}></i>
              </a> */}
              <button
                class="btn btn-primary  btn-sm"
                value={product.id}
                onClick={handleShowView}
                style={{ marginRight: "5px" }}
              >
                <i class="fas fa-folder fa-lg" style={{ pointerEvents: 'none' }}></i>
              </button>
              {/* <button
                class="btn btn-info btn-sm"
                value={product.id}
                onClick={handleShowEdit}
                style={{ marginRight: "5px" }}
              >
                <i class="fas fa-pencil-alt fa-lg"></i>
              </button> */}
              <button
                class="btn btn-danger btn-sm"
                value={product.id}
                onClick={handleShowDelete}
                style={{ marginRight: "5px" }}
              >
                <i class="fas fa-trash fa-lg" style={{ pointerEvents: 'none' }}></i>
              </button>
            </div>
          </div>
        ),
      };
      all.push(element);
    }
    return all;
  };
  const settingDatatable = () => {
    const data = {
      columns: [
        {
          label: "No.",
          field: "sr",
          sort: "asc",
          width: 50,
        },
        {
          label: "Category",
          field: "category",
          sort: "asc",
          width: 150,
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
          width: 300,
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
          width: 200,
        },
      ],
      rows: rowTable(listProduct),
    };
    setDataTable(data)
  }


  return (
    <Layout title="Manage product">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
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

                        {/* <select
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
                        </select> */}
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

                <div className="row mt-3" style={{ marginBottom: "-50px" }}>
                  <div className="col-lg-12">
                    <div className="float-right">
                      <select className="custom-select" style={{ width: 'auto' }} data-sortorder onChange={(e) => { setSelectedStatus(e.target.value); handerFilter(e, "status") }}>
                        <option value=""> Filter by status </option>
                        {listStatus
                          ? listStatus.map((status) => (
                            <option value={status.id}>{status.name}</option>
                          ))
                          : null}
                      </select>
                      <select className="custom-select" style={{ width: 'auto' }} data-sortorder onChange={(e) => { setSelectedCategory(e.target.value); handerFilter(e, "category") }}>
                        <option value=""> Filter by category</option>
                        {listCategory
                          ? listCategory.map((category) =>
                            category.child_category.length > 0 ? (
                              <option value={category.id}>{category.category_name}</option>
                            ) : null)
                          : null}
                      </select>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search name"
                        style={{ width: 'auto', display: 'inline', paddingTop: '0px' }}
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); handerFilter(e, "search") }}
                      ></input>
                    </div>
                    {/* <div className="" style={{ float: "right" }}>
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
                    </div> */}
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
                      fixed
                      autoWidth={false}
                      // barReverse
                      noBottomColumns
                      data={dataTable}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* <AddProductModal
        show={showAdd}
        handleClose={() => {
          setShowAdd(false);
          setName(null);
          setCategory([])
          setDescriptionDetail(null);
          setDescriptionList(null);
          setSearchWord(null);
          setProductStatusId(null);
          setChildCategory([])
          setParentCategory([])
        }}
        onSubmit={handleCloseAdd}
        modalTitle={"Add New Product"}
        name={name}
        setName={setName}
        category={category}
        setCategory={setCategory}
        descriptionDetail={descriptionDetail}
        setDescriptionDetail={setDescriptionDetail}
        descriptionList={descriptionList}
        setDescriptionList={setDescriptionList}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        productStatusId={productStatusId}
        setProductStatusId={setProductStatusId}
        listCategory={listCategory}
        listProduct={listProduct}
        listProductStatus={listProductStatus}
        childCategory={childCategory}
        setChildCategory={setChildCategory}
        parentCategory={parentCategory}
        setParentCategory={setParentCategory}
      />
      <ViewProductModal
        show={showView}
        handleClose={handleCloseView}
        onSubmit={handleCloseEdit}
        modalTitle={"Product"}
        name={name}
        setName={setName}
        category={category}
        setCategory={setCategory}
        descriptionDetail={descriptionDetail}
        setDescriptionDetail={setDescriptionDetail}
        descriptionList={descriptionList}
        setDescriptionList={setDescriptionList}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        productStatusId={productStatusId}
        setProductStatusId={setProductStatusId}
        listCategory={listCategory}
        listProduct={listProduct}
        listProductStatus={listProductStatus}
        childCategory={childCategory}
        setChildCategory={setChildCategory}
        parentCategory={parentCategory}
        setParentCategory={setParentCategory}
        edit={edit}
        setEdit={setEdit}
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
      /> */}
    </Layout>
  );
};

export default Carrier;

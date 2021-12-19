import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getListTracking,
} from "../../actions";
import Layout from "../../components/Layout";
import TimeLine from "./Component/TimeLine";
import { getListDelivery } from "../../actions/Setting/delivery.action";

const Carrier = () => {
  const trackings = useSelector((state) => state.carriers.trackings)
  const delivery = useSelector((state) => state.setting_admin.delivery);

  const [listTracking, setListTracking] = useState([])
  const [listDelivery, setListDelivery] = useState([])
  const [trackingDetail, setTrackingDetail] = useState({})


  const [showView, setShowView] = useState(false);
  const [dataTable, setDataTable] = useState([])

  //entries
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [search, setSearch] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListTracking());
    dispatch(getListDelivery());
  }, [dispatch]);



  useEffect(() => {
    setListTracking(trackings)
    setListDelivery(delivery)
  }, [trackings, delivery]);

  const getNameDelivery = (code)=>{
    const deliveryDetails = listDelivery.find((delivery) => delivery.service_name === code);
    if(deliveryDetails){
      return deliveryDetails.name
    }
    return code
  }


  const handleShowView = (e) => {
    const tracking_number = e.target.value

    const detail = listTracking.find((tracking) => tracking.tracking_number === tracking_number);
    setTrackingDetail(detail);
    setShowView(true);

  };
  const handleCloseView = () => {
    setTrackingDetail({})
    setShowView(false);
  };
  const getSearch = (e) => {
    e.preventDefault();
    const searchName = e.target.value
    setSearch(searchName)
    let listData = trackings

    if(deliveryFilter){
      listData = trackings.filter((tracking) => String(tracking.order_number).includes(searchName) && String(tracking.courier_code)===String(deliveryFilter))
    }else{
      listData = trackings.filter((tracking) => String(tracking.order_number).includes(searchName))
    }
    setListTracking(listData)
  }

  const getDeliveryFilter = (e) => {
    e.preventDefault();
    const select = e.target.value
    setDeliveryFilter(select)
    console.log(select)
    let listData = trackings

    if(search&&search!=""){
      listData = trackings.filter((tracking) => String(tracking.order_number).includes(search))
    }
    if(select &&select!=""){
      listData = listData.filter((tracking) => String(tracking.courier_code)===String(select))
    }
    setListTracking(listData)
  }
  // console.log(listDelivery)
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
    // dispatch(getListProduct(data))
  }
  useEffect(() => {
    settingDatatable();
  }, [listTracking])

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const rowTable = (listTrackings) => {

    const all = [];
    for (let [index, tracking] of listTrackings.entries()) {
      var element = {
        sr: index + 1,
        tracking_no: (
          <>
            <b>
              {getNameDelivery(tracking.courier_code)}
              
              {/* Viettel Post */}
            </b>
            <br />
            <a>
              {tracking.tracking_number}
            </a>
          </>
        ),
        order_no: tracking.order_number,
        status: (
          <>
            <a>
              {tracking.delivery_status == "expired" ? (
                <span class="badge bg-danger">{capitalizeFirstLetter(tracking.delivery_status)}</span>
              ) : tracking.delivery_status == "notfound" ? (
                <span class="badge bg-secondary">{capitalizeFirstLetter(tracking.delivery_status)}</span>
              ) : (
                <span class="badge bg-success">{capitalizeFirstLetter(tracking.delivery_status)}</span>
              )}


            </a>
            <br />
            {tracking.latest_event ? (
              <a>
                {tracking.latest_event}
              </a>
            ) : null}

          </>
        ),
        transit_time: tracking.transit_time,
        btn: (
          <div className="row">
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
                value={tracking.tracking_number}
                onClick={handleShowView}
              // style={{ marginRight: "5px" }}
              >
                <i class="fas fa-folder fa-lg" style={{ pointerEvents: 'none' }}></i>
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
          label: "Tracking No.",
          field: "tracking_no",
          sort: "asc",
          width: 150,
        },
        {
          label: "Order No.",
          field: "order_no",
          sort: "asc",
          width: 300,
        },
        {
          label: "Parcel Status",
          field: "status",
          sort: "asc",
          width: 50,
        },
        {
          label: "Transit Time",
          field: "transit_time",
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
      rows: rowTable(listTracking),
    };
    setDataTable(data)
  }


  return (
    <Layout title="Manage carrier">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  
                  {/* <div class="card-title">
                    <button
                      className="btn btn-block bg-gradient-primary"
                      // onClick={handleShowAdd}
                    >
                      New A Product
                    </button>
                  </div> */}
                  <div style={{ float: "right" }}>
                    <div className="row">
                      <div className="col-md-6">


                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div style={{ marginTop: "5px", marginBottom: "-67px" }}>
                  </div>
                </div>

                <div className="row mt-3" style={{ marginBottom: "-50px" }}>
                  <div className="col-lg-12">
                    <div className="float-right">
                    <select className="custom-select" style={{ width: 'auto' }} data-sortorder onChange={(e) => { getDeliveryFilter(e) }}>
                        <option value=""> Filter by Tracking No </option>
                        {listDelivery
                          ? listDelivery.map((delivery) => (
                            <option value={delivery.service_name}>{delivery.name}</option>
                          ))
                          : null}
                      </select>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search order id"
                        style={{ width: 'auto', display: 'inline', paddingTop: '0px' }}
                        value={search}
                        onChange={(e) => { getSearch(e) }}
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

      <TimeLine
        show={showView}
        handleClose={handleCloseView}
        onSubmit={handleCloseView}
        modalTitle={"Time Line"}
        trackingDetail={trackingDetail}
      />
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

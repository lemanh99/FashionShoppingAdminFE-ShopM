
import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeVisibleDeliveryMethod, createDeliveryMethod, deleteDeliveryMethod, getListDelivery, updateDeliveryMethod } from "../../actions/Setting/delivery.action";
import { changeVisiblePaymentMethod, createPaymentMethod, deletePaymentMethod, getPaymentMethod, updatePaymentMethod } from "../../actions/Setting/payment.action";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";
import axiosIntance from "../../helpers/axios";
import AddDeliveryModal from "./DeliveryComponent/AddDeliveryModal";
import ViewDeliveryModal from "./DeliveryComponent/ViewDeliveryModal";
import AddPaymentModal from "./PaymentComponent/AddPaymentModal";
import DeletePaymentModal from "./PaymentComponent/DeletePaymentModal";
import ViewPaymentModal from "./PaymentComponent/ViewPaymentModal";


const DeliverySetting = () => {
  const delivery = useSelector((state) => state.setting_admin.delivery);

  const [listDelivery, setListDelivery] = useState([]);
  const [name, setName] = useState(null);
  const [serviceName, setServiceName] = useState(null);
  const [confirmUrl, setConfirmUrl] = useState(null);
  const [description, setDescription] = useState(null)
  const [visible, setVisible] = useState(true);
  const [deliveryId, setDeliveryId] = useState(null);
  const [deliveryItem, setDeliveryItem] = useState({});
  const [message, setMessage] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [dataTable, setDataTable] = useState([])
  const [edit, setEdit] = useState(false);

  const [showView, setShowView] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //entries
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListDelivery());
  }, [dispatch]);
  useEffect(() => {
    setListDelivery(delivery)
  }, [delivery]);
  //show Modal

  const handleShowAdd = () => {
    setName(null);
    setServiceName(null);
    setConfirmUrl(null);
    setDescription(null);
    setVisible(true)
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    const delivery = {
      "name": name,
      "service_name": serviceName,
      "confirm_url": confirmUrl,
      "description": description,
      "visible": visible,
    }
    dispatch(createDeliveryMethod(delivery));
    setShowAdd(false);
    setName(null);
    setServiceName(null);
    setConfirmUrl(null);
    setDescription(null);
    setVisible(true)
  };

  const handleShowView = (e) => {
    const id = e.target.value
    setDeliveryId(id);
    axiosIntance.get(`setting/delivery/detail/${id}`).then((res) => {
      const { data } = res.data;
      if (data) {
        setName(data.name);
        setServiceName(data.service_name);
        setConfirmUrl(data.confirm_url);
        setDescription(data.description);
        setVisible(data.visible);
        setShowView(true);
      }
    })


  };
  const handleCloseView = () => {
    setName(null);
    setServiceName(null);
    setConfirmUrl(null);
    setDescription(null);
    setVisible(true)
    setDeliveryId(null)
    setEdit(false);
    setShowView(false);
  };

  const handleShowDelete = (event) => {
    const id = event.target.value;
    const data = listDelivery.find((delivery) => Number(delivery.id) === Number(id));
    if (data) {
      setDeliveryItem(data);
      setName(data.name);
      setShowDeleteModal(true);
    }
  };

  const handleCloseDelete = (e) => {
    dispatch(deleteDeliveryMethod(deliveryItem.id))
    setDeliveryItem({});
    setName(null);
    setServiceName(null);
    setConfirmUrl(null);
    setDescription(null);
    setVisible(true)
    setShowDeleteModal(false);
  };

  const handleCloseEdit = () => {
    const delivery = {
      "id": deliveryId,
      "name": name,
      "service_name": serviceName,
      "confirm_url": confirmUrl,
      "description": description,
      "visible": visible,
    }
    dispatch(updateDeliveryMethod(delivery));
    setDeliveryId(null);
    setName(null);
    setServiceName(null);
    setConfirmUrl(null);
    setDescription(null);
    setVisible(true)
    setEdit(false);
    setShowView(false);
  };
  useEffect(() => {
    settingDatatable();
  }, [listDelivery])

  const handTogleVisible = (e) => {
    e.preventDefault();
    const id = e.target.value;
    const lst = listDelivery.find((delivery) => Number(delivery.id) === Number(id));
    if (lst) {
      const data = {
        "id": lst.id,
        "visible": !lst.visible,
      }
      dispatch(changeVisibleDeliveryMethod(data));
    }

  }
  const rowTable = (listDelivery) => {
    const all = [];
    for (let [index, delivery] of listDelivery.entries()) {
      var element = {
        sr: index + 1,
        name: delivery.name,
        service_name: delivery.service_name,
        visible: (
          <div className="form-group">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id={`customSwitch${index}`}
                checked={delivery.visible}
                value={delivery.id}
                onChange={(e) => { handTogleVisible(e) }} />
              <label className="custom-control-label" htmlFor={`customSwitch${index}`}></label>
            </div>
          </div>
        ),
        btn: (
          <div className="row" style={{ width: '86px' }}>
            <div class="project-actions  text-center">
              <button
                class="btn btn-primary  btn-sm"
                value={delivery.id}
                onClick={handleShowView}
                style={{ marginRight: "5px" }}
              >
                <i class="fas fa-folder fa-lg" style={{ pointerEvents: 'none' }}></i>
              </button>
              <button
                class="btn btn-danger btn-sm"
                value={delivery.id}
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
          label: "Name",
          field: "name",
          sort: "asc",
          width: 150,
        },
        {
          label: "Service name",
          field: "service_name",
          sort: "asc",
          width: 150,
        },
        {
          label: "Visible",
          field: "visible",
          sort: "asc",
          width: 150,
        },
        {
          label: "",
          field: "btn",
          sort: "asc",
          width: 200,
        },
      ],
      rows: rowTable(listDelivery),
    };
    setDataTable(data)
  }


  return (
    <Layout title="Manage product">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <div class="card-title">
                    <button
                      className="btn btn-block bg-gradient-primary"
                      onClick={handleShowAdd}
                    >
                      New A Delivery
                    </button>
                  </div>
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
            <div className="col-md-2"></div>
          </div>
        </div>
      </section>
      <AddDeliveryModal
        show={showAdd}
        handleClose={() => {
          setName(null);
          setServiceName(null);
          setConfirmUrl(null);
          setDescription(null);
          setVisible(true);
          setShowAdd(false);
        }}
        onSubmit={handleCloseAdd}
        modalTitle={"Add Delivery"}
        name={name}
        setName={setName}
        serviceName={serviceName}
        setServiceName={setServiceName}
        confirmUrl={confirmUrl}
        setConfirmUrl={setConfirmUrl}
        description={description}
        setDescription={setDescription}
        visible={visible}
        setVisible={setVisible}
      />
      <ViewDeliveryModal
        show={showView}
        handleClose={handleCloseView}
        onSubmit={handleCloseEdit}
        modalTitle={"Delivery"}
        name={name}
        setName={setName}
        serviceName={serviceName}
        setServiceName={setServiceName}
        confirmUrl={confirmUrl}
        setConfirmUrl={setConfirmUrl}
        description={description}
        setDescription={setDescription}
        visible={visible}
        setVisible={setVisible}
        edit={edit}
        setEdit={setEdit}
      />
      
      <DeletePaymentModal
        show={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
          setDeliveryItem({})
          setName(null)
        }}
        modalTitle={"Delete Product"}
        onSubmit={handleCloseDelete}
        name={name}
      />
    </Layout>
  );
};

export default DeliverySetting;

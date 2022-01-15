
import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeVisiblePaymentMethod, createPaymentMethod, deletePaymentMethod, getPaymentMethod, updatePaymentMethod } from "../../actions/Setting/payment.action";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";
import axiosIntance from "../../helpers/axios";
import AddPaymentModal from "./PaymentComponent/AddPaymentModal";
import DeletePaymentModal from "./PaymentComponent/DeletePaymentModal";
import ViewPaymentModal from "./PaymentComponent/ViewPaymentModal";


const PaymentMethod = () => {
  const payment = useSelector((state) => state.setting_admin.paymentMethod);

  const [listPayment, setListPayment] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [visible, setVisible] = useState(true);
  const [paymentId, setPaymentId] = useState(null);
  const [paymentItem, setPaymentItem] = useState({});
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
    dispatch(getPaymentMethod());
  }, [dispatch]);
  useEffect(() => {
    setListPayment(payment)
  }, [payment]);
  //show Modal

  const handleShowAdd = () => {
    setPaymentMethod(null)
    setVisible(true)
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    const payment = {
      "payment_method": paymentMethod,
      "visible": visible,
    }
    dispatch(createPaymentMethod(payment));
    setShowAdd(false);
    setPaymentMethod(null)
    setVisible(true)
  };

  const handleShowView = (e) => {
    const id = e.target.value
    setPaymentId(id);
    axiosIntance.get(`setting/payment/detail/${id}`).then((res) => {
      const { data } = res.data;
      if (data) {
        setPaymentMethod(data.payment_method);
        setVisible(data.visible);
        setShowView(true);
      }
    })


  };
  const handleCloseView = () => {
    setPaymentMethod(null)
    setVisible(true)
    setPaymentId(null)
    setEdit(false);
    setShowView(false);
  };

  const handleShowDelete = (event) => {
    const id = event.target.value;
    const pay = listPayment.find((payment) => Number(payment.id) === Number(id));
    if (pay) {
      setPaymentItem(pay);
      setPaymentMethod(pay.payment_method);
      setShowDeleteModal(true);
    }
  };

  const handleCloseDelete = (e) => {
    dispatch(deletePaymentMethod(paymentItem.id))
    setPaymentItem({});
    setPaymentMethod(null)
    setShowDeleteModal(false);
  };

  const handleCloseEdit = () => {
    const payment = {
      "id": paymentId,
      "payment_method": paymentMethod,
      "visible": visible,
    }
    dispatch(updatePaymentMethod(payment));
    setPaymentId(null);
    setVisible(false);
    setPaymentMethod(null);
    setEdit(false);
    setShowView(false);
  };
  useEffect(() => {
    settingDatatable();
  }, [listPayment])

  const handTogleVisible=(e)=>{
    e.preventDefault();
    const id = e.target.value;
    const pay = listPayment.find((payment) => Number(payment.id) === Number(id));
    if(pay){
      const data ={
        "id": pay.id,
        "visible": !pay.visible,
      }
      dispatch(changeVisiblePaymentMethod(data));
    }

  }
  const rowTable = (paymentMethod) => {
    const all = [];
    for (let [index, payment] of paymentMethod.entries()) {
      var element = {
        sr: index + 1,
        payment_method: payment.payment_method,
        visible: (
          <div className="form-group">
            <div className="custom-control custom-switch">
              <input 
              type="checkbox" 
              className="custom-control-input" 
              id={`customSwitch${index}`} 
              checked={payment.visible} 
              value={payment.id} 
              onChange={(e)=>{handTogleVisible(e)} }/>
              <label className="custom-control-label" htmlFor={`customSwitch${index}`}></label>
            </div>
          </div>
        ),
        btn: (
          <div className="row" style={{ width: '86px' }}>
            <div class="project-actions  text-center">
              <button
                class="btn btn-primary  btn-sm"
                value={payment.id}
                onClick={handleShowView}
                style={{ marginRight: "5px" }}
              >
                <i class="fas fa-folder fa-lg" style={{ pointerEvents: 'none' }}></i>
              </button>
              <button
                class="btn btn-danger btn-sm"
                value={payment.id}
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
          label: "Payment method",
          field: "payment_method",
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
      rows: rowTable(listPayment),
    };
    setDataTable(data)
  }


  return (
    <Layout title="Setting payment">
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
                      New A Payment Method
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
      <AddPaymentModal
        show={showAdd}
        handleClose={() => {
          setShowAdd(false);
          setPaymentMethod(null);
          setVisible(true);
        }}
        onSubmit={handleCloseAdd}
        modalTitle={"Add Payment method"}
        paymentMethod={paymentMethod}
        visible={visible}
        setPaymentMethod={setPaymentMethod}
        setVisible={setVisible}
      />
      <ViewPaymentModal
        show={showView}
        handleClose={handleCloseView}
        onSubmit={handleCloseEdit}
        modalTitle={"Payment method"}
        paymentMethod={paymentMethod}
        visible={visible}
        setPaymentMethod={setPaymentMethod}
        setVisible={setVisible}
        edit={edit}
        setEdit={setEdit}
      />
      <DeletePaymentModal
        show={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
          setPaymentItem({})
          setPaymentMethod(null)
        }}
        modalTitle={"Delete Product"}
        onSubmit={handleCloseDelete}
        name={paymentMethod}
      />
    </Layout>
  );
};

export default PaymentMethod;

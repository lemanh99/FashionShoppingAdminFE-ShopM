import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
// import Tabs from "react-bootstrap/Tabs";
import { Tab, Tabs } from "react-bootstrap";
import PendingTable from "./components/PendingTable";
import { getListCustomer, getOrders, handerOrderCanceled, orderShiped } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import CancelTable from "./components/CancelTable";
import CompleteTable from "./components/CompleteTable";
import InvoiceModal from "./components/InvoiceModal";
import axiosIntance from "../../helpers/axios";
import { getAddressVietNam } from "../../utils/address";
import axios from "axios";
import TransportTable from "./components/TransportTable";

const Order = () => {
  const orders = useSelector((state) => state.order);
  const orderCanceled = useSelector((state) => state.order.cancelled)
  const orderReceived = useSelector((state) => state.order.received)
  const orderTransported = useSelector((state) => state.order.transported)
  const orderDelivered = useSelector((state) => state.order.delivered)

  const customers = useSelector((state) => state.customer);
  const [key, setKey] = useState("1");
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [addressApi, setAddressApi] = useState([]);
  const [trackingNumber, setTrackingNumber] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getListCustomer());
  }, [dispatch]);

  useEffect(() => {
    getCountry()
  }, [])

  async function getCountry() {
    const res = await axios.get('https://provinces.open-api.vn/api/?depth=3')
    if (res) {
      setAddressApi(res.data)
    }
  }
  const handleShiped = (event) => {
    const data = {
      tracking_number: trackingNumber,
    }
    dispatch(orderShiped(event.target.value, data));
    setShow(false);
    setCustomer([]);
    setOrder([]);
    setTrackingNumber("");
  };

  const handleCancel = (event) => {
    dispatch(handerOrderCanceled(event.target.value));
    setShow(false);
    setCustomer([]);
    setOrder([]);
    setTrackingNumber("");
  };


  const handleShow = (event) => {
    const orderCode = event.target.value;
    axiosIntance.get(`order/admin/detail/${orderCode}`).then((res) => {
      const { data } = res.data;
      setOrder(data);
      setShow(true);
    })

    // setShipping(ord.shipping)

    // const prod = products.listProduct.find((product) => product._id === id);

  };
  const handleClose = () => {
    setShow(false);
    setCustomer([]);
    setOrder([]);
  };
  return (
    <Layout title="Orders">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card card-primary card-tabs">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                >
                  <Tab eventKey="1" title="Approval">
                    <PendingTable
                      listOrder={orderReceived}
                      show={show}
                      handleShow={handleShow}

                    />
                  </Tab>
                  <Tab eventKey="2" title="Cancelled">
                    <CancelTable
                      listOrder={orderCanceled}
                      show={show}
                      handleShow={handleShow}
                    />
                  </Tab>
                  <Tab eventKey="3" title="Transported">
                    <TransportTable
                      listOrder={orderTransported}
                      show={show}
                      handleShow={handleShow}
                    />
                  </Tab>
                  <Tab eventKey="4" title="Completed">
                    <CompleteTable
                      listOrder={orderDelivered}
                      show={show}
                      handleShow={handleShow}
                    />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
      {order ? (
        <InvoiceModal
          show={show}
          handleClose={handleClose}
          order={order}
          customer={customer}
          handleShiped={handleShiped}
          handleCancel={handleCancel}
          addressApi={addressApi}
          trackingNumber={trackingNumber}
          setTrackingNumber={setTrackingNumber}
        />
      ) : null}
    </Layout>
  );
};

export default Order;

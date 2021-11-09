import axios from "axios";
import Chart from "chart.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListAdmin,
  getListCustomer,
  getListProduct,
  getOrders,
} from "../../actions";
import Layout from "../../components/Layout";
import { api } from "../../urlConfig";
import InforBox from "./components/InforBox";
import LastMember from "./components/LastMember";
import LastOrders from "./components/LastOrders";
import LastProduct from "./components/LastProduct";

/**
 * @author
 * @function Home
 **/

const Dashboard = (props) => {
  const customer = useSelector((state) => state.customer);
  const product = useSelector((state) => state.product);
  const order = useSelector((state) => state.order);

  const [newOder, setNewOder] = useState(0);
  const [lastCustomer, setLastCustomer] = useState(0);
  const [lastProduct, setLastProduct] = useState(0);
  const [lastOrder, setLastOrder] = useState(0);
  const [topProduct, setTopProduct] = useState([]);

  const [lastMonth, setLastMonth] = useState([]);
  const [countCustomer, setCountCustomer] = useState([]);
  const [countProduct, setCountProduct] = useState([]);
  const [countOrder, setCountOrder] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListAdmin());
    dispatch(getListCustomer());
    dispatch(getOrders());
    dispatch(getListProduct());
  }, [dispatch]);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const url = api+"/order/top?start=0&end=5"
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, //the token is a variable which holds the token
      },
    }).then(res => {
      const data = res.data;
      setTopProduct(data.data)
    });
  }, []);
  useEffect(() => {
    const pending = order.orders.filter(
      (order) => order.paymentStatus === "pending"
    );
    setNewOder(pending.length);
    setLastCustomer(customer.listCustomer.length);
    setLastProduct(product.listProduct.length);
    setLastOrder(order.orders.length);
    setDataChart();
  }, [customer.listCustomer, product.listProduct, order.orders]);

  useEffect(() => {
    // Bar chart
    return new Chart(document.getElementById("bar-chart"), {
      type: "bar",
      data: {
        labels: lastMonth.reverse(),
        datasets: [
          {
            label: "New Products",
            yAxesGroups: "A",
            backgroundColor: [
              "#8e5ea2",
              "#8e5ea2",
              "#8e5ea2",
              "#8e5ea2",
              "#8e5ea2",
              "#8e5ea2",
            ],
            data: countProduct.reverse(),
          },
          {
            label: "Member Register ",
            yAxesGroups: "B",
            backgroundColor: [
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
            ],
            data: countCustomer.reverse(),
          },
          {
            label: "Orders",
            yAxesGroups: "C",
            backgroundColor: [
              "#c45850",
              "#c45850",
              "#c45850",
              "#c45850",
              "#c45850",
              "#c45850",
            ],
            data: countOrder.reverse(),
          },
        ],
      },
      options: {
        legend: { display: true },
        // title: {
        //   display: true,
        //   text:
        //     "Predicted world population (millions) in 2050",
        // },
        yAxes: [
          {
            name: "A",
            type: "linear",
            position: "left",
            scalePositionLeft: true,
          },
          {
            name: "B",
            type: "linear",
            position: "right",
            scalePositionLeft: false,
          },
          {
            name: "C",
            type: "linear",
            position: "right",
            scalePositionLeft: false,
          },
        ],
      },
    });
  }, [lastMonth, countProduct, countOrder, countCustomer]);
  const getMonth = (datas) => {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();

    var i = 0;
    let list = [];
    let listNameMonth = [];
    const data = datas.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    do {
      var count = data.filter(
        (_data) => new Date(_data.createdAt).getMonth() === month
      ).length;
      listNameMonth.push(monthNames[month] + "-" + year);
      list.push({
        month: month,
        year: year,
        monthNames: monthNames[month],
        count: count,
      });
      if (month === 0) {
        month = 11;
        year--;
      } else {
        month--;
      }
      i++;
    } while (i < 6);
    return { month: listNameMonth, data: list };
  };
  const setDataChart = () => {
    const prods = getMonth(product.listProduct);
    // setCountProduct(prod.data)
    setLastMonth(prods.month);
    var lst = [];
    for (let prod of prods.data) {
      lst.push(prod.count);
    }
    setCountProduct(lst);
    lst = [];
    const od = getMonth(order.orders);
    for (let order of od.data) {
      lst.push(order.count);
    }
    setCountOrder(lst);
    lst = [];
    const cus = getMonth(customer.listCustomer);
    for (let customer of cus.data) {
      lst.push(customer.count);
    }
    setCountCustomer(lst);
  };

  return (
    // <Layout sidebar>
    <Layout title="Dashboard">
      <section class="content">
        <div class="container-fluid">
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              {/* Info boxes */}
              <div className="row">
                <InforBox
                  icon="fas fa-shopping-bag"
                  background="bg-info"
                  title="New Order"
                  value={newOder}
                  // type="increase"
                  // percentage="10"
                />
                <InforBox
                  icon="fas fa-user-plus"
                  background="bg-warning"
                  title="New Registrations"
                  value={lastCustomer}
                  // type="increase"
                  // percentage="10"
                />
                <InforBox
                  icon="fas fa-shopping-cart"
                  background="bg-success"
                  title="Sales"
                  value={lastOrder}
                  // type="increase"
                  // percentage="10"
                />
                <InforBox
                  icon="fab fa-product-hunt"
                  background="bg-danger"
                  title="Product"
                  value={lastProduct}
                  // type="increase"
                  // percentage="10"
                />
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">Monthly Recap Report</h5>
                      <div className="card-tools">
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="collapse"
                        >
                          <i className="fas fa-minus" />
                        </button>
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-tool dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            <i className="fas fa-wrench" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-right"
                            role="menu"
                          ></div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="remove"
                        >
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <p className="text-center">
                            <strong>
                              Sales overview:
                              {lastMonth.length > 0
                                ? " " +
                                  lastMonth[lastMonth.length - 1].slice(0, 3) +
                                  ", " +
                                  lastMonth[lastMonth.length - 1].slice(-4) +
                                  " - " +
                                  lastMonth[0].slice(0, 3) +
                                  ", " +
                                  lastMonth[0].slice(-4)
                                : null}
                            </strong>
                          </p>
                          <div className="chart">
                            <canvas
                              id="bar-chart"
                              height={100}
                              style={{ height: "100px" }}
                              className="chartjs-render-monitor"
                            ></canvas>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer">
                      <div className="row">
                        {/* <div className="col-sm-3 col-6">
                          <div className="description-block border-right">
                            <span className="description-percentage text-success">
                              <i className="fas fa-caret-up" /> 17%
                            </span>
                            <h5 className="description-header">$35,210.43</h5>
                            <span className="description-text">
                              TOTAL REVENUE
                            </span>
                          </div>
                        </div>

                        <div className="col-sm-3 col-6">
                          <div className="description-block border-right">
                            <span className="description-percentage text-warning">
                              <i className="fas fa-caret-left" /> 0%
                            </span>
                            <h5 className="description-header">$10,390.90</h5>
                            <span className="description-text">TOTAL COST</span>
                          </div>
                        </div>

                        <div className="col-sm-3 col-6">
                          <div className="description-block border-right">
                            <span className="description-percentage text-success">
                              <i className="fas fa-caret-up" /> 20%
                            </span>
                            <h5 className="description-header">$24,813.53</h5>
                            <span className="description-text">
                              TOTAL PROFIT
                            </span>
                          </div>
                        </div>

                        <div className="col-sm-3 col-6">
                          <div className="description-block">
                            <span className="description-percentage text-danger">
                              <i className="fas fa-caret-down" /> 18%
                            </span>
                            <h5 className="description-header">1200</h5>
                            <span className="description-text">
                              GOAL COMPLETIONS
                            </span>
                          </div>
                        </div>
                       */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">
                        Top 5 best selling products
                      </h3>
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
                        {topProduct
                          .map((product, index) => {
                            return (
                              <li className="item">
                                <div className="product-img">
                                  <li className="nav-item dropdown">
                                    <div className="nav-link">
                                      <i
                                        className="far fa-star text-warning"
                                        style={{ fontSize: "33px" }}
                                      />
                                      <span
                                        className="badge badge-warning navbar-badge"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        {index + 1}
                                      </span>
                                    </div>
                                  </li>
                                </div>
                                <div className="product-info">
                                  <div className="product-title">
                                    {product.product.name}
                                    <span className="badge badge-warning float-right">
                                      ${Math.round(product.product.price-product.product.price*product.product.discount/100)}
                                    </span>
                                  </div>
                                  <span className="product-description">
                                    Sell number:<b>{product.sellQuantity}</b>
                                  </span>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <LastOrders order={order} />
                </div>

                <div className="col-md-4">
                  <LastMember customer={customer} />
                </div>

                <div className="col-md-4">
                  <LastProduct product={product} />
                </div>
              </div>
            </div>
            {/*/. container-fluid */}
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;

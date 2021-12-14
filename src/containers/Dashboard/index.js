import axios from "axios";
import Chart from "chart.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../../actions/Dashboard/dashboard.action";
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
  const dashboard = useSelector((state) => state.dashboard);

  const [newOder, setNewOder] = useState(0);
  const [lastCustomer, setLastCustomer] = useState(0);
  const [lastProduct, setLastProduct] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [lastOrder, setLastOrder] = useState(0);
  const [topProduct, setTopProduct] = useState([]);

  const [lastMonth, setLastMonth] = useState([]);
  const [countCustomer, setCountCustomer] = useState([]);
  const [countProduct, setCountProduct] = useState([]);
  const [countOrder, setCountOrder] = useState([]);
  const [listLastOrder, setListLastOrder] = useState([]);
  const [listLastProduct, setListLastProduct] = useState([]);
  const [listLastCustomer, setListLastCustomer] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  useEffect(() => {
    setListLastOrder(dashboard.orders);
    setListLastProduct(dashboard.products);
    setListLastCustomer(dashboard.customers);
    setTopProduct(dashboard.top_sell);
    if (dashboard.graph_views.name_six_last_month && dashboard.graph_views.orders && dashboard.graph_views.customers && dashboard.graph_views.products) {
      setLastMonth(dashboard.graph_views.name_six_last_month);
      setCountOrder(dashboard.graph_views.orders);
      setCountCustomer(dashboard.graph_views.customers);
      setCountProduct(dashboard.graph_views.products)
    }
    setLastProduct(dashboard.shop_month.product_last_month);
    setLastCustomer(dashboard.shop_month.customer_last_month);
    setLastOrder(dashboard.shop_month.order_last_month);
    setRevenue(dashboard.shop_month.subtotal_order_month);
  }, [dashboard])

  useEffect(() => {
    // Bar chart
    return new Chart(document.getElementById("bar-chart"), {
      type: "bar",
      data: {
        labels: lastMonth && lastMonth.length > 0 ? lastMonth : [
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
        ],
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
            data: countProduct,
          },
          {
            label: "Customer Register ",
            yAxesGroups: "B",
            backgroundColor: [
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
            ],
            data: countCustomer,
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
            data: countOrder,
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
                  value={lastOrder}
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
                  title="Monthly Revenue"
                  value={`${revenue} VND`}
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
                              Sales overview
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
                        {topProduct && topProduct.items ? (
                          topProduct.items
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
                                      <a href={`http://localhost:3000/shop/${product.product_id}`} target="_blank">{product.product_name}</a>
                                      <span className="badge badge-warning float-right">
                                        {/* ${Math.round(product.product.price-product.product.price*product.product.discount/100)} */}
                                      </span>
                                    </div>
                                    <span className="product-description">
                                      Sell number:<b>{product.total}</b>
                                    </span>
                                  </div>
                                </li>
                              );
                            })
                        ) : null}
                      </ul>

                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <LastOrders order={listLastOrder} />
                </div>

                <div className="col-md-4">
                  <LastMember customer={listLastCustomer} />
                </div>

                <div className="col-md-4">
                  <LastProduct product={listLastProduct} />
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

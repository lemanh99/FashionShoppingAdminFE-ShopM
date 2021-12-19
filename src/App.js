import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { isAdminLoggedIn } from "./actions";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Customer from "./containers/Customer/Customer";
import Category from "./containers/Category/Category";
import CategoryChild from "./containers/Category/CategoryChild";
import Brand from "./containers/Brand/Brand";
import Product from "./containers/Product/Product";
import ProductSku from "./containers/ProductSku/ProductSku";
import Statistical from "./containers/Statistical";
import ErrorPage from "./containers/ErrorPage";
import Home from "./containers/Home";
import Admin from "./containers/Admin/manage_admin";
import MyAccount from "./containers/Setting/MyAccount";
import PaymentMethod from "./containers/Setting/PaymentMethod";
import DeliverySetting from "./containers/Setting/DeliverySetting";
import Signin from "./containers/Signin";
import Signout from "./containers/Signout";
import Order from "./containers/Orders/Order";
import Dashboard from "./containers/Dashboard";
import Carrier from "./containers/Carrier/Carrier";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isAdminLoggedIn());
    }
  }, [auth.authenticate]);
  return (
    <>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        <PrivateRoute path="/signout" component={Signout} />
        {/* Manage Admin */}
        <PrivateRoute path="/manage-admin" component={Admin} />
        {/* Manage Customer */}
        <PrivateRoute path="/manage-customer" component={Customer} />
        {/* Manage Category */}
        <PrivateRoute path="/manage-category" component={Category} />
        {/* Manage Category Child*/}
        <PrivateRoute path="/manage-category-child/:id" component={CategoryChild} />
        {/* Manage Brand */}
        <PrivateRoute path="/manage-brand" component={Brand} />
        {/* Manage Product */}
        <PrivateRoute path="/manage-product" component={Product} />
        {/* Manage Product SKU*/}
        <PrivateRoute path="/manage-product-sku/:id" component={ProductSku} />
        {/* Manage Order */}
        <PrivateRoute path="/manage-order" component={Order} />
        {/* Statistical */}
        <PrivateRoute path="/statistical" component={Statistical} />
        {/* Carrier */}
        <PrivateRoute path="/carrier" component={Carrier} />

        {/* setting account */}
        <PrivateRoute path="/my-account" component={MyAccount} />
        <PrivateRoute path="/delivery" component={DeliverySetting} />
        <PrivateRoute path="/payment-method" component={PaymentMethod} />

        <Route path="/signin" component={Signin} />
        <Route path="/thongke" component={Statistical} />

        <PrivateRoute component={ErrorPage} />
      </Switch>
    </>
  );
}

export default App;

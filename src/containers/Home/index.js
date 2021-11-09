import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import Layout from '../../components/Layout';
import {
  getListAdmin,
  getListCustomer,
  getListProduct,
  getOrders,
} from "../../actions";
import { Redirect } from "react-router-dom";
/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  const [wait, setWait] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListAdmin());
    dispatch(getOrders());
    dispatch(getListCustomer());

    dispatch(getListProduct());
  });
  setTimeout(() => {
    setWait(true);
  }, 3000);
  return wait ? (
    <Redirect to={`dashboard`} />
  ) : (
    <div className="card-body">
      .
      <div className="overlay ">
        <div className="row justify-content-center">
          <i
            className="fas fad fa-spinner fa-spin"
            style={{ fontSize: "50px" }}
          />
        </div>
        <div className="row justify-content-center">
          <p style={{ fontSize: "30px" }}>Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

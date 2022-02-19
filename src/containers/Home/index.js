import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './loading.css';
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
  const user = useSelector((state) => state.user);
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
    user.infor.role === 1 ? <Redirect to={`dashboard`} /> : <Redirect to={`manage-customer`} />

  ) : (
    <div className="card-body">
      .
      <div id="loading" className='home1'>
        <div id="loading-center">
          <div id="loading-center-absolute">
            <div className="object" id="object_one"></div>
            <div className="object" id="object_two"></div>
            <div className="object" id="object_three"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

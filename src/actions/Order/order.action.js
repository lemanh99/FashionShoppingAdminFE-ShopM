import { orderConstants } from "../constants";
import axios from "../../helpers/axios";

export const getOrders = () => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_ALL_ORDER_REQUEST });
    const res = await axios.get(`/order`);
    const res_received = await axios.get(`/order?shipping_status=1`);
    const res_transported = await axios.get(`/order?shipping_status=2`);
    const res_delivered = await axios.get(`/order?shipping_status=3`);
    const res_cancelled = await axios.get(`/order?shipping_status=4`);
    if (res.status === 200 && res_transported.status === 200 
      && res_delivered.status === 200 && res_transported.status === 200 &res_cancelled.status === 200) {
      const {data} = res.data
      const received = res_received.data.data;
      const transported = res_transported.data.data;
      const delivered = res_delivered.data.data;
      const cancelled = res_cancelled.data.data;
      console.log(received)
      dispatch({
        type: orderConstants.GET_ALL_ORDER_SUCCESS,
        payload: {
          orders: [],
          received: received.items,
          transported: transported.items,
          delivered: delivered.items,
          cancelled: cancelled.items,
        },
      });
    } else {
      dispatch({
        type: orderConstants.GET_ALL_ORDER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const orderShiped = (id) => {
  return async (dispatch) => {
    console.log("cjhay day", id);
    const res = await axios.post(`/confirm-shiped/${id}`);
    if (res.status === 201) {
      dispatch(getOrders());
    } else {
      const { error } = res.data;
      console.log(error);
    }
  };
};

export const orderCanceled = (id) => {
  return async (dispatch) => {
    const res = await axios.post(`/confirm-canceled-by-admin/${id}`);
    if (res.status === 201) {
      dispatch(getOrders());
    } else {
      const { error } = res.data;
      console.log(error);
    }
  };
};

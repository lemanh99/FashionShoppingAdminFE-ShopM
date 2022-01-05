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
      && res_delivered.status === 200 && res_transported.status === 200 & res_cancelled.status === 200) {
      const { data } = res.data
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
        payload: " " ,
      });
    }
  };
};

export const orderShiped = (order_id, data) => {
  return async (dispatch) => {
    const res = await axios.put(`/order/shipping/transported/${order_id}`, { ...data });
    if (res && res.status === 200) {
      dispatch(getOrders());
    } else {
      const { error } = res.data;
      console.log(error);
    }
  };
};

export const handerOrderCanceled = (id) => {
  return async (dispatch) => {
    const res = await axios.put(`/order/admin/cancel/${id}`);
    if (res && res.status === 200) {
      dispatch(getOrders());
    } else {
      const { error } = res.data;
      console.log(error);
    }
  };
};

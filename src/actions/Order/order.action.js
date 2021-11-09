import { orderConstants } from "../constants";
import axios from "../../helpers/axios";

export const getOrders = () => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_ALL_ORDER_REQUEST });
    const res = await axios.get(`/order/all`);
    if (res.status === 200) {
      console.log(res.data);
      const { data } = res.data;
      dispatch({
        type: orderConstants.GET_ALL_ORDER_SUCCESS,
        payload: {
          orders: data,
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

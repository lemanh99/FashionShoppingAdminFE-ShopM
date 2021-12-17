import axios from "../../helpers/axios";
import { customerConstants } from "../constants";

export const getListCustomer = () => {
  return async (dispatch) => {
    dispatch({ type: customerConstants.GET_ALL_CUSTOMER_REQUEST });
    const res = await axios.get(`user/customer/`);
    if (res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: customerConstants.GET_ALL_CUSTOMER_SUCCESS,
        payload: {
          listCustomer: data,
        },
      });
    } else {
      dispatch({
        type: customerConstants.GET_ALL_CUSTOMER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const register = (user) => {
  return async (dispatch) => {
    dispatch({
      type: customerConstants.CUSTOMER_REGISTER_REQUEST,
    });
    const res = await axios.post(`/user/customer/new`, {
      ...user,
    });

    if (res.status === 200) {
      dispatch(getListCustomer());
      const { message } = res.data;
      dispatch({
        type: customerConstants.CUSTOMER_REGISTER_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: customerConstants.CUSTOMER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const blockCustomer = (id, status) => {
  return async (dispatch) => {
    dispatch({ type: customerConstants.CUSTOMER_BLOCK_REQUEST });
    const res = await axios.put(`/user/customer/${id}/status/update`, {
      "status_id": status
    });

    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: customerConstants.CUSTOMER_BLOCK_SUCCESS,
        payload: { message: message, error: "" },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: customerConstants.CUSTOMER_BLOCK_FAILURE,
        payload: { message: "", error: error },
      });
    }
  };
};

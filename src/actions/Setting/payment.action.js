import { adminConstants} from "../constants";
import axios from "../../helpers/axios";

export const getPaymentMethod = () => {
  return async (dispatch) => {
    dispatch({ type: adminConstants.SETTING_PAYMENT_METHOD_REQUEST });
    const res = await axios.get(`/setting/payment/`);
    if (res && res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: adminConstants.SETTING_PAYMENT_METHOD_SUCCESS,
        payload: {
          paymentMethod: data,
        },
      });
    } else {
      dispatch({
        type: adminConstants.SETTING_PAYMENT_METHOD_FAILURE,
        payload: " " ,
      });
    }
  };
};

export const createPaymentMethod = (form) => {
  return async (dispatch) => {
    const res = await axios.post(`/setting/payment/create/`, form);
    if (res && res.status === 200) {
      dispatch(getPaymentMethod());
    }
  };
};
export const updatePaymentMethod = (payment) => {
  return async (dispatch) => {
    const res = await axios.put(`/setting/payment/update/${payment.id}`, { ...payment });
    if (res && res.status === 200) {
      dispatch(getPaymentMethod());
    }
  };
};

export const deletePaymentMethod = (id) => {
  return async (dispatch) => {
    const res = await axios.delete(`/setting/payment/delete/${id}`);
    if (res && res.status === 200) {
      dispatch(getPaymentMethod());
    }
  };
};

export const changeVisiblePaymentMethod = (payment) => {
  return async (dispatch) => {
    const res = await axios.put(`/setting/payment/active/${payment.id}`, { ...payment });
    if (res && res.status === 200) {
      dispatch(getPaymentMethod());
    }
  };
};
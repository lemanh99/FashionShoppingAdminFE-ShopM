import { adminConstants } from "../constants";
import axios from "../../helpers/axios";

export const getListDelivery = () => {
  return async (dispatch) => {
    dispatch({ type: adminConstants.SETTING_DELIVERY_REQUEST });
    const res = await axios.get(`/setting/delivery/`);
    if (res && res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: adminConstants.SETTING_DELIVERY_SUCCESS,
        payload: {
          delivery: data,
        },
      });
    } else {
      dispatch({
        type: adminConstants.SETTING_DELIVERY_FAILURE,
        payload: " " ,
      });
    }
  };
};

export const createDeliveryMethod = (form) => {
  return async (dispatch) => {
    const res = await axios.post(`/setting/delivery/create/`, form);
    if (res && res.status === 200) {
      dispatch(getListDelivery());
    }
  };
};
export const updateDeliveryMethod = (delivery) => {
  return async (dispatch) => {
    const res = await axios.put(`/setting/delivery/update/${delivery.id}`, { ...delivery });
    if (res && res.status === 200) {
      dispatch(getListDelivery());
    }
  };
};

export const deleteDeliveryMethod = (id) => {
  return async (dispatch) => {
    const res = await axios.delete(`/setting/delivery/delete/${id}`);
    if (res && res.status === 200) {
      dispatch(getListDelivery());
    }
  };
};

export const changeVisibleDeliveryMethod = (delivery) => {
  return async (dispatch) => {
    const res = await axios.put(`/setting/delivery/active/${delivery.id}`, { ...delivery });
    if (res && res.status === 200) {
      dispatch(getListDelivery());
    }
  };
};
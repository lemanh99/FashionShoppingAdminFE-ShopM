import { masterConstants } from "../constants";
import axios from "../../helpers/axios";

export const getSize = () => {
  return async (dispatch) => {
    dispatch({ type: masterConstants.GET_ALL_MASTER_REQUEST });
    const res = await axios.get(`/master/target/detail/?name=size`);
    if (res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: masterConstants.GET_ALL_MASTER_SIZE_SUCCESS,
        payload: {
          size: data,
        },
      });
    } else {
      dispatch({
        type: masterConstants.GET_ALL_MASTER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};



export const getColor = () => {
    return async (dispatch) => {
      dispatch({ type: masterConstants.GET_ALL_MASTER_REQUEST });
      const res = await axios.get(`/master/target/detail/?name=color`);
      if (res.status === 200) {
        const { data } = res.data;
        dispatch({
          type: masterConstants.GET_ALL_MASTER_COLOR_SUCCESS,
          payload: {
            color: data,
          },
        });
      } else {
        dispatch({
          type: masterConstants.GET_ALL_MASTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  };

  export const getProductStatus = () => {
    return async (dispatch) => {
      dispatch({ type: masterConstants.GET_ALL_MASTER_REQUEST });
      const res = await axios.get(`/master/target/detail/?name=product-status`);
      if (res.status === 200) {
        const { data } = res.data;
        dispatch({
          type: masterConstants.GET_ALL_MASTER_PRODUCT_STATUS_SUCCESS,
          payload: {
            product_status: data,
          },
        });
      } else {
        dispatch({
          type: masterConstants.GET_ALL_MASTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  };
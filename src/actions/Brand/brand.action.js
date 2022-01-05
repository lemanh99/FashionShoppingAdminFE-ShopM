import axios from "../../helpers/axios";
import { brandConstants } from "../constants";

export const getListBrand = () => {
  return async (dispatch) => {
    dispatch({ type: brandConstants.GET_ALL_BRAND_REQUEST });
    const res = await axios.get(`/brand/all`);
    if (res && res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: brandConstants.GET_ALL_BRAND_SUCCESS,
        payload: {
          listBrand: data,
        },
      });
    } else {
      dispatch({
        type: brandConstants.GET_ALL_BRAND_FAILURE,
        payload: " " ,
      });
    }
  };
};

export const addBrand = (form) => {
  return async (dispatch) => {
    dispatch({
      type: brandConstants.ADD_BRAND_REQUEST,
    });
    const res = await axios.post(`/brand/create`, form);

    if (res && res.status === 200) {
      dispatch(getListBrand());
      const { message } = res.data;
      dispatch({
        type: brandConstants.ADD_BRAND_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: brandConstants.ADD_BRAND_FAILURE,
          payload: " " ,
        });
      }
    }
  };
};
export const deleteBrand = (id) => {
  return async (dispatch) => {
    dispatch({ type: brandConstants.DELETE_BRAND_REQUEST });
    const res = await axios.delete(`/brand/delete/${id}`);
    if (res.status === 202) {
      const { message } = res.data;
      dispatch(getListBrand());
      dispatch({
        type: brandConstants.DELETE_BRAND_SUCCESS,
        payload: { message: message, error: "" },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: brandConstants.DELETE_BRAND_FAILURE,
        payload: { message: "", error: error },
      });
    }
  };
};

export const updateBrand = (form) => {
  return async (dispatch) => {
    const { id } = form.get("id");
    dispatch({ type: brandConstants.UPDATE_BRAND_REQUEST });
    const res = await axios.post(`/brand/update/${id}`, form);

    if (res && res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: brandConstants.UPDATE_BRAND_SUCCESS,
        payload: { message: message, error: "" },
      });
      dispatch(getListBrand());
    } else {
      const { error } = res.data;
      dispatch({
        type: brandConstants.UPDATE_BRAND_FAILURE,
        payload: { message: "", error: error },
      });
    }
  };
};

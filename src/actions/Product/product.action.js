import axios from "../../helpers/axios";
import { productConstants } from "../constants";

export const getListProduct = (filters) => {
  return async (dispatch) => {
    const category_parent_id = filters && filters.category_parent_id?filters.category_parent_id:"";
    const search_keyword = filters && filters.search_keyword?filters.search_keyword:"";
    const product_status = filters && filters.product_status?filters.product_status:"";

    dispatch({ type: productConstants.GET_ALL_PRODUCT_REQUEST });
    const res = await axios.get(`/product/?product_status=${product_status}&search_keyword=${search_keyword}&category_parent_id=${category_parent_id}`);
    if (res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: productConstants.GET_ALL_PRODUCT_SUCCESS,
        payload: {
          listProduct: data.items,
        },
      });
    } else {
      dispatch({
        type: productConstants.GET_ALL_PRODUCT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addProduct = (form) => {
  return async (dispatch) => {
    dispatch({
      type: productConstants.ADD_PRODUCT_REQUEST,
    });
    const res = await axios.post(`/product/create/`, form);

    if (res.status === 200) {
      dispatch(getListProduct());
      const { message } = res.data;
      dispatch({
        type: productConstants.ADD_PRODUCT_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: productConstants.ADD_PRODUCT_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST });
    const res = await axios.delete(`/product/delete/${id}`);
    if (res.status === 202) {
      const { message } = res.data;
      dispatch(getListProduct());
      dispatch({
        type: productConstants.DELETE_PRODUCT_SUCCESS,
        payload: { message: message, error: "" },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: productConstants.DELETE_PRODUCT_FAILURE,
        payload: { message: "", error: error },
      });
    }
  };
};

export const updateProduct = (form) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.UPDATE_PRODUCT_REQUEST });
    const res = await axios.post(`/product/update/${form.get('id')}`, form );

    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: productConstants.UPDATE_PRODUCT_SUCCESS,
        payload: { message: message, error: "" },
      });
      dispatch(getListProduct());
    } else {
      const { error } = res.data;
      dispatch({
        type: productConstants.UPDATE_PRODUCT_FAILURE,
        payload: { message: "", error: error },
      });
    }
  };
};

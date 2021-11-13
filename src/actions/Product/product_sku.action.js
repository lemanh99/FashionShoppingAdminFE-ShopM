import axios from "../../helpers/axios";
import { productSkuConstants } from "../constants";

export const getListProductSku = () => {
  return async (dispatch) => {
    dispatch({ type: productSkuConstants.GET_ALL_PRODUCT_SKU_REQUEST });
    const res = await axios.get(`/product`);
    if (res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: productSkuConstants.GET_ALL_PRODUCT_SKU_SUCCESS,
        payload: {
          listProductSku: data.items,
        },
      });
    } else {
      dispatch({
        type: productSkuConstants.GET_ALL_PRODUCT_SKU_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getListProductSkuByProductId = (product_id) => {
  return async (dispatch) => {
    dispatch({ type: productSkuConstants.GET_ALL_PRODUCT_SKU_REQUEST });
    const res = await axios.get(`/product/sku/${product_id}/detail`);
    if (res.status === 200) {
      const { data } = res.data;
      console.log(data)
      dispatch({
        type: productSkuConstants.GET_ALL_PRODUCT_SKU_SUCCESS,
        payload: {
          listProductSku: data,
        },
      });
    } else {
      dispatch({
        type: productSkuConstants.GET_ALL_PRODUCT_SKU_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addProductSku = (form) => {
  return async (dispatch) => {
    dispatch({
      type: productSkuConstants.ADD_PRODUCT_SKU_REQUEST,
    });
    const res = await axios.post(`/product/sku/create/`, form);

    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: productSkuConstants.ADD_PRODUCT_SKU_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: productSkuConstants.ADD_PRODUCT_SKU_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
export const deleteProductSku = (id) => {
  return async (dispatch) => {
    dispatch({ type: productSkuConstants.DELETE_PRODUCT_SKU_REQUEST });
    const res = await axios.delete(`/product/delete/${id}`);
    if (res.status === 202) {
      const { message } = res.data;
      dispatch(getListProductSku());
      dispatch({
        type: productSkuConstants.DELETE_PRODUCT_SKU_SUCCESS,
        payload: { message: message, error: "" },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: productSkuConstants.DELETE_PRODUCT_SKU_FAILURE,
        payload: { message: "", error: error },
      });
    }
  };
};

export const updateProductSku = (form) => {
  return async (dispatch) => {
    dispatch({ type: productSkuConstants.UPDATE_PRODUCT_SKU_REQUEST });
    const res = await axios.put(`/product/sku/update/${form.get('id')}`, form );

    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: productSkuConstants.UPDATE_PRODUCT_SKU_SUCCESS,
        payload: { message: message, error: "" },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: productSkuConstants.UPDATE_PRODUCT_SKU_FAILURE,
        payload: { message: "", error: error },
      });
    }
  };
};

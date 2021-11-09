import axios from "../../helpers/axios";
import { categoryChildConstants, categoryConstants } from "../constants";

export const getListCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });
    const res = await axios.get(`/product/category`);

    if (res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
        payload: {
          listCategory: data,
        },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};



export const addCatgeory = (category) => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstants.ADD_CATEGORY_REQUEST,
    });
    const res = await axios.post(`/product/category/create/`, { ...category });

    if (res.status === 200) {
      dispatch(getListCategory());
      const { message } = res.data;
      dispatch({
        type: categoryConstants.ADD_CATEGORY_SUCCESS,
        payload: { message },
      });

    } else {
      if (res.status === 400) {
        dispatch({
          type: categoryConstants.ADD_CATEGORY_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
export const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });
    const res = await axios.delete(`/product/category/delete/${id}`);
    if (res.status === 200) {
      const { message } = res.data;
      dispatch(getListCategory());
      dispatch({
        type: categoryConstants.DELETE_CATEGORY_SUCCESS,
        payload: { message: message, error: "" },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: categoryConstants.DELETE_CATEGORY_FAILURE,
        payload: { message: "", error: error },
      });
    }
  };
};

export const updateCategory = (form) => {
  return async (dispatch) => {
    const id = form.get("id");
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST });
    const res = await axios.put(`/product/category/update/${id}`, form);

    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: categoryConstants.UPDATE_CATEGORY_SUCCESS,
        payload: { message: message, error: "" },
      });
      dispatch(getListCategory());
    } else {
      const { error } = res.data;
      dispatch({
        type: categoryConstants.UPDATE_CATEGORY_FAILURE,
        payload: { message: "", error: error },
      });
    }
  };
};

export const getListCategoryChild = (id) => {
  return async (dispatch) => {
    dispatch({ type: categoryChildConstants.GET_ALL_CATEGORY_CHILD_REQUEST });
    const res = await axios.get(`/product/category/`, { params: { parent_category_id:id }});

    if (res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: categoryChildConstants.GET_ALL_CATEGORY_CHILD_SUCCESS,
        payload: {
          listCategory: data,
        },
      });
    } else {
      dispatch({
        type: categoryChildConstants.GET_ALL_CATEGORY_CHILD_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
import axios from "../../helpers/axios";
import { adminConstants } from "../constants";

export const signup = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: adminConstants.ADMIN_REGISTER_REQUEST,
      });
      const res = await axios.post(`/user/member/create/`, {
        ...user,
      });

      if (res && res.status === 200) {
        dispatch(getListAdmin());
        const { message } = res.data;
        dispatch({
          type: adminConstants.ADMIN_REGISTER_SUCCESS,
          payload: { message },
        });
      } else {
        if (res.status === 400) {
          dispatch({
            type: adminConstants.ADMIN_REGISTER_FAILURE,
            payload: " " ,
          });
        }
      }
    } catch (error) {
    }
  };
};

export const getListAdmin = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: adminConstants.GET_ALL_ADMIN_REQUEST });
      const res = await axios.get(`/user/member/`);
      if (res && res.status === 200) {
        const { data } = res.data;
        dispatch({
          type: adminConstants.GET_ALL_ADMIN_SUCCESS,
          payload: {
            listAdmin: data,
          },
        });
      } else {
        dispatch({
          type: adminConstants.GET_ALL_ADMIN_FAILURE,
          payload: " " ,
        });
      }
    } catch (error) {

    }
  };
};

export const deleteAdminById = (id) => {
  return async (dispatch) => {
    dispatch({ type: adminConstants.DELETE_ONE_ADMIN_REQUEST });
    const res = await axios.delete(`/admin/delete/${id}`);

    if (res.status === 202) {
      const { message } = res.data;
      dispatch(getListAdmin());
      dispatch({
        type: adminConstants.DELETE_ONE_ADMIN_SUCCESS,
        payload: { message: message, error: "" },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: adminConstants.DELETE_ONE_ADMIN_FAILURE,
        payload: { message: "", error: error },
      });
    }
  };
};

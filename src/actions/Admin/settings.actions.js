import axios from "../../helpers/axios";
import { adminConstants } from "../constants";

export const ChangeInformation = (data) => {
  return async (dispatch) => {
    dispatch({ type: adminConstants.CHANGE_INFORMATION_REQUEST });
    const res = await axios.put(`admin/${data.id}/change-information`, { data });
    if (res && res.status === 200) {
      const { message, user } = res.data;
      dispatch({
        type: adminConstants.CHANGE_INFORMATION_SUCCESS,
        payload: {
          message: message,
        },
      });
      dispatch({
        type: adminConstants.UPDATE_INFORMATION_SUCCESS,
        payload: {
          user: user,
        }
      })
    } else {
      const { error } = res.data;
      dispatch({
        type: adminConstants.CHANGE_INFORMATION_FAILURE,
        payload: {
          error: error,
        },
      });
    }
  };
};

export const ChangePassword = (data) => {
  return async (dispatch) => {
    dispatch({ type: adminConstants.CHANGE_PASSWORD_REQUEST });
    const res = await axios.post(`user/password/`, { ...data });
    if (res && res.status === 200) {
      const { message} = res.data;
      dispatch({
        type: adminConstants.CHANGE_PASSWORD_SUCCESS,
        payload: {
          message: message,
        },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: adminConstants.CHANGE_PASSWORD_FAILURE,
        payload: {
          error: error,
        },
      });
    }
  };
};

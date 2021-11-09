import axios from "../../helpers/axios";
import { loginConstants } from "../constants";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: loginConstants.LOGIN_REQUEST,
    });

    const res = await axios.post(`admin/signin`, {
      ...user,
    });
    
    if (res.status === 400) {
      dispatch({
        type: loginConstants.LOGIN_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: loginConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: loginConstants.LOGIN_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    }
  };
};

export const isAdminLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: loginConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
        dispatch({
            type: loginConstants.LOGIN_FAILURE,
            payload: {
                error:' Please login first'
            }
        })
    }
  };
};

import jwt from 'jwt-decode'
import axios from "../../helpers/axios";
import { authConstants, userConstants } from "../constants";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });

    const res = await axios.post(`user/login/`, {
      ...user,
    });
    try {
      if (res.status === 200) {
        const { data } = res.data;
        const token = data.access;
        const refresh = data.refresh;
        localStorage.setItem("token", token);
        localStorage.setItem("refresh", refresh);

        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
          },
        });
      } else {
        if (res.status === 400) {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: {
              error: res.data.error,
            },
          });
        }
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: "Error Server",
        },
      });
    }

  };
};

export const isAdminLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: ' Please login first'
        }
      })
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const refresh = localStorage.getItem("refresh");

    const res = await axios.post(`/user/logout`, {refresh: refresh});
    if (res.status === 200) {
      localStorage.clear();
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: {
          error: 'Logout false'
        },
      });
    }
  };
};


export const inforUser = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_INFO_USER_REQUEST });

    const res = await await axios.get(`user/me/`);

    if (res.status === 200) {
      const { data } = res.data
      const user = {
        id: data.user_id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        fullName: data.full_name,
        role: data.authority_id,
      }
      dispatch({
        type: userConstants.GET_INFO_USER_SUCCESS,
        payload: {
          user,
        },
      });
    } else {
      dispatch({
        type: userConstants.GET_INFO_USER_FAILURE,
        payload: res.data.error,
      });
    }
  };
};


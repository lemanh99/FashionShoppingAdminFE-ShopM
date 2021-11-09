import { registerContants } from "../constants";
import axios from "../../helpers/axios";
import { getListAdmin } from "./manage_admin.actions";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({
      type: registerContants.ADMIN_REGISTER_REQUEST,
    });
    const res = await axios.post(`/admin/signup`, {
      ...user,
    });

    if (res.status === 201) {
      dispatch(getListAdmin());
      const { message } = res.data;
      dispatch({
        type: registerContants.ADMIN_REGISTER_SUCCESS,
        payload: { message },
      });
      
    } else {
      if (res.status === 400) {
        dispatch({
          type: registerContants.ADMIN_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

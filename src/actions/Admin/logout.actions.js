import axios from "../../helpers/axios";
import { logoutConstants } from "../constants";

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: logoutConstants.LOGOUT_REQUEST });
    const res = await axios.post(`/admin/signout`);
    console.log("Logout",res)
    if (res && res.status === 200) {
      localStorage.clear();
      dispatch({ type: logoutConstants.LOGOUT_SUCCESS });
    } else {
      dispatch({
        type: logoutConstants.LOGOUT_FAILURE,
        payload: res.data.error,
      });
    }
  };
};

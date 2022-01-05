import { carrierConstants} from "../constants";
import axios from "../../helpers/axios";

export const getListTracking = () => {
  return async (dispatch) => {
    dispatch({ type: carrierConstants.GET_CARRIER_REQUEST });
    const res = await axios.get(`/order/shipping/tracking-number/tracking-more/get-results`);
    if (res && res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: carrierConstants.GET_CARRIER_SUCCESS,
        payload: {
          trackings: data.data,
        },
      });
    } else {
      dispatch({
        type: carrierConstants.GET_CARRIER_FAILURE,
        payload: " " ,
      });
    }
  };
};

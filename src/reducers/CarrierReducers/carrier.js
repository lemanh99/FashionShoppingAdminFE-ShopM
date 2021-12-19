import { carrierConstants } from "../../actions/constants";

const initState = {
  trackings: [],
  loading: false,
  error: "",
  messages: "",
};

export default (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case carrierConstants.GET_CARRIER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case carrierConstants.GET_CARRIER_SUCCESS:
      state = {
        ...initState,
        loading: false,
        trackings: action.payload.trackings,
      };
      break;
    case carrierConstants.GET_CARRIER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    }
  return state;
};

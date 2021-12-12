import { orderConstants } from "../../actions/constants";

const initState = {
  orders: [],
  received: [],
  transported:[],
  delivered:[],
  cancelled:[],
  loading: false,
  error: "",
  messages: "",
};

export default (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case orderConstants.GET_ALL_ORDER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.GET_ALL_ORDER_SUCCESS:
      state = {
        ...initState,
        loading: false,
        orders: action.payload.orders,
        received: action.payload.received,
        transported:action.payload.transported,
        delivered:action.payload.delivered,
        cancelled:action.payload.cancelled,
      };
      break;
    case orderConstants.GET_ALL_ORDER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    }
  return state;
};

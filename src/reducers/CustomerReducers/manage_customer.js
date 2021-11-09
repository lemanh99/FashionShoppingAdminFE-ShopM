import { customerConstants } from "../../actions/constants";

const initState = {
  listCustomer: [],
  loading: false,
  error: "",
  messages: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case customerConstants.GET_ALL_CUSTOMER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case customerConstants.GET_ALL_CUSTOMER_SUCCESS:
      state = {
        ...initState,
        loading: false,
        listCustomer: action.payload.listCustomer,
      };
      break;
    case customerConstants.GET_ALL_CUSTOMER_FAILURE:
      state = {
        ...state,
        loading: false,
        messages: action.payload.error,
        error: action.payload.error,
      };
      break;
    case customerConstants.CUSTOMER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case customerConstants.CUSTOMER_REGISTER_SUCCESS:
      state = {
        ...state,
        messages: "Register a new customer successfully!",
        loading: false,
      };
      break;
    case customerConstants.CUSTOMER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        messages: action.payload.error,
        error: action.payload.error,
      };
      break;
    case customerConstants.CUSTOMER_BLOCK_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case customerConstants.CUSTOMER_BLOCK_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: "",
      };
      break;
    case customerConstants.CUSTOMER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        messages: action.payload.error,
        error: action.payload.error,
      };
      break;
  }
  return state;
};

import { adminConstants } from "../../actions/constants";

const initState = {
  error: "",
  messageInfor: "",
  messagePass: "",
  loading: false,
  delivery: [],
  paymentMethod: [],
};



export default (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case adminConstants.CHANGE_INFORMATION_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case adminConstants.CHANGE_INFORMATION_SUCCESS:
      state = {
        ...initState,
        loading: false,
        messageInfor: action.payload.message,
      };
      break;
    case adminConstants.CHANGE_INFORMATION_FAILURE:
      state = {
        ...state,
        loading: false,
        messageInfor: "",
        error: action.payload.error,
      };
      break;
    case adminConstants.CHANGE_PASSWORD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case adminConstants.CHANGE_PASSWORD_SUCCESS:
      state = {
        ...initState,
        loading: false,
        messagePass: action.payload.message,
        // error: "",
        // messageInfor: "",
      };
      break;
    case adminConstants.CHANGE_PASSWORD_FAILURE:
      state = {
        ...state,
        loading: false,
        messagePass: "",
        error: action.payload.error,
      };
      break;

    case adminConstants.SETTING_PAYMENT_METHOD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case adminConstants.SETTING_PAYMENT_METHOD_SUCCESS:
      state = {
        ...state,
        loading: false,
        paymentMethod: action.payload.paymentMethod,
      };
      break;
    case adminConstants.SETTING_PAYMENT_METHOD_FAILURE:
      state = {
        ...state,
        loading: false,
        messagePass: "",
        error: action.payload.error,
      };
      break;

    case adminConstants.SETTING_DELIVERY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case adminConstants.SETTING_DELIVERY_SUCCESS:
      state = {
        ...state,
        loading: false,
        delivery: action.payload.delivery,
      };
      break;
    case adminConstants.SETTING_DELIVERY_FAILURE:
      state = {
        ...state,
        loading: false,
        messagePass: "",
        error: action.payload.error,
      };
      break;
  }
  return state;
};

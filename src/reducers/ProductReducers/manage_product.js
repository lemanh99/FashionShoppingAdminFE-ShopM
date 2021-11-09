import { productConstants } from "../../actions/constants";

const initState = {
  listProduct: [],
  loading: false,
  error: "",
  messages: "",
};

export default (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_ALL_PRODUCT_SUCCESS:
      state = {
        ...initState,
        loading: false,
        listProduct: action.payload.listProduct,
      };
      break;
    case productConstants.GET_ALL_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case productConstants.ADD_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.ADD_PRODUCT_SUCCESS:
      state = {
        ...state,
        messages: action.payload.message,
        loading: false,
      };
      break;
    case productConstants.ADD_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        messages: action.payload.error,
        error: action.payload.error,
      };
      break;
    case productConstants.UPDATE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.UPDATE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: "Update PRODUCT successfully",
      };
      break;
    case productConstants.UPDATE_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        messages: action.payload.error,
        error: action.payload.error,
      };
      break;
    case productConstants.DELETE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.DELETE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productConstants.DELETE_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};

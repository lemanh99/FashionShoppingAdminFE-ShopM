import { productSkuConstants } from "../../actions/constants";

const initState = {
  listProductSku: [],
  loading: false,
  error: "",
  messages: "",
};

export default (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case productSkuConstants.GET_ALL_PRODUCT_SKU_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productSkuConstants.GET_ALL_PRODUCT_SKU_SUCCESS:
      state = {
        ...initState,
        loading: false,
        listProductSku: action.payload.listProductSku,
      };
      break;
    case productSkuConstants.GET_ALL_PRODUCT_SKU_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case productSkuConstants.ADD_PRODUCT_SKU_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productSkuConstants.ADD_PRODUCT_SKU_SUCCESS:
      state = {
        ...state,
        messages: action.payload.message,
        loading: false,
      };
      break;
    case productSkuConstants.ADD_PRODUCT_SKU_FAILURE:
      state = {
        ...state,
        loading: false,
        messages: action.payload.error,
        error: action.payload.error,
      };
      break;
    case productSkuConstants.UPDATE_PRODUCT_SKU_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productSkuConstants.UPDATE_PRODUCT_SKU_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: "Update PRODUCT successfully",
      };
      break;
    case productSkuConstants.UPDATE_PRODUCT_SKU_FAILURE:
      state = {
        ...state,
        loading: false,
        messages: action.payload.error,
        error: action.payload.error,
      };
      break;
    case productSkuConstants.DELETE_PRODUCT_SKU_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productSkuConstants.DELETE_PRODUCT_SKU_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productSkuConstants.DELETE_PRODUCT_SKU_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};

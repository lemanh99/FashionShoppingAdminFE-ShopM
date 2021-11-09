import { brandConstants } from "../../actions/constants";

const initState = {
  listBrand: [],
  loading: false,
  error: "",
  messages: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case brandConstants.GET_ALL_BRAND_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case brandConstants.GET_ALL_BRAND_SUCCESS:
      state = {
        ...initState,
        loading: false,
        listBrand: action.payload.listBrand,
      };
      break;
    case brandConstants.GET_ALL_BRAND_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case brandConstants.ADD_BRAND_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case brandConstants.ADD_BRAND_SUCCESS:
      state = {
        ...state,
        messages: action.payload.message,
        loading: false,
      };
      break;
    case brandConstants.ADD_BRAND_FAILURE:
      state = {
        ...state,
        loading: false,
        messages: action.payload.error,
        error: action.payload.error,
      };
      break;
    case brandConstants.UPDATE_BRAND_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case brandConstants.UPDATE_BRAND_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: "Update BRAND successfully",
      };
      break;
    case brandConstants.UPDATE_BRAND_FAILURE:
      state = {
        ...state,
        loading: false,
        messages: action.payload.error,
        error: action.payload.error,
      };
      break;
    case brandConstants.DELETE_BRAND_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case brandConstants.DELETE_BRAND_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case brandConstants.DELETE_BRAND_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};

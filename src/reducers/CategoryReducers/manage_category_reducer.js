import { categoryConstants } from "../../actions/constants";

const initState = {
  listCategory: [],
  loading: false,
  error: "",
  messages: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
      state = {
        ...initState,
        loading: false,
        listCategory: action.payload.listCategory,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case categoryConstants.ADD_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.ADD_CATEGORY_SUCCESS:
      state = {
        ...state,
        messages: action.payload.message,
        loading: false,
      };
      break;
    case categoryConstants.ADD_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        messages: action.payload.error,
        error: action.payload.error,
      };
      break;
    case categoryConstants.UPDATE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.UPDATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: "Update category successfully",
      };
      break;
    case categoryConstants.UPDATE_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        messages: action.payload.error,
        error: action.payload.error,
      };
      break;
    case categoryConstants.DELETE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.DELETE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.DELETE_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};

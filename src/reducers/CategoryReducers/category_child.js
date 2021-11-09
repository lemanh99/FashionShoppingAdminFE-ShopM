import { categoryChildConstants } from "../../actions/constants";

const initState = {
  listCategory: [],
  loading: false,
  error: "",
  messages: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryChildConstants.GET_ALL_CATEGORY_CHILD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryChildConstants.GET_ALL_CATEGORY_CHILD_SUCCESS:
      state = {
        ...initState,
        loading: false,
        listCategory: action.payload.listCategory,
      };
      break;
    case categoryChildConstants.GET_ALL_CATEGORY_CHILD_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case categoryChildConstants.ADD_CATEGORY_CHILD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryChildConstants.ADD_CATEGORY_CHILD_SUCCESS:
      state = {
        ...state,
        messages: action.payload.message,
        loading: false,
      };
      break;
    case categoryChildConstants.ADD_CATEGORY_CHILD_FAILURE:
      state = {
        ...state,
        loading: false,
        messages: action.payload.error,
        error: action.payload.error,
      };
      break;
    case categoryChildConstants.UPDATE_CATEGORY_CHILD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryChildConstants.UPDATE_CATEGORY_CHILD_SUCCESS:
      state = {
        ...state,
        loading: false,
        messages: "Update category successfully",
      };
      break;
    case categoryChildConstants.UPDATE_CATEGORY_CHILD_FAILURE:
      state = {
        ...state,
        loading: false,
        messages: action.payload.error,
        error: action.payload.error,
      };
      break;
    case categoryChildConstants.DELETE_CATEGORY_CHILD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryChildConstants.DELETE_CATEGORY_CHILD_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryChildConstants.DELETE_CATEGORY_CHILD_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};

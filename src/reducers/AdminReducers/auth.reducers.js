import {
  authConstants,
  adminConstants,
} from "../../actions/constants";

const initState = {
  token: null,
  authenticate: false,
  authenticating: false,
  loading: false,
  error: "",
  message: "",
  user:null,
};



export default (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...initState,
        error: action.payload.error,
        loading: false,
      };
      break;
    case adminConstants.UPDATE_INFORMATION_SUCCESS:
      state = {
        ...state,
        message: "",
        error: "",
        user: action.payload.user,
        // loading: false,
      };
      break;

    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
        message: "Logout Success",
      };

      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};

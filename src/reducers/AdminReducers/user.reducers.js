import {
    userConstants,
} from "../../actions/constants";

const initState = {
    infor: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        fullName: null,
        role: null,
    },
    loading: false,
    error: "",
    message: "",
};



export default (state = initState, action) => {
    console.log(action.type);
    switch (action.type) {
        case userConstants.GET_INFO_USER_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case userConstants.GET_INFO_USER_SUCCESS:
            state = {
                ...state,
                infor: action.payload.user,
                loading: false,
            };
            break;
        case userConstants.GET_INFO_USER_FAILURE:
            state = {
                ...initState,
                error: action.payload.error,
                loading: false,
            };
    }
    return state;
};

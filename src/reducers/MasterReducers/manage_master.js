import { masterConstants } from "../../actions/constants";

const initState = {
    size: [],
    color: [],
    product_status: [],
    loading: false,
    error: null,
    messages: null,
};

export default (state = initState, action) => {
    console.log(action.type);
    switch (action.type) {
        case masterConstants.GET_ALL_MASTER_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case masterConstants.GET_ALL_MASTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                size: action.payload.size,
                color: action.payload.color,
                error: null,
                messages: null,
            };
            break;

        case masterConstants.GET_ALL_MASTER_SIZE_SUCCESS:
            state = {
                ...state,
                loading: false,
                size: action.payload.size,
                error: null,
                messages: null,
            };
            break;
        case masterConstants.GET_ALL_MASTER_COLOR_SUCCESS:
            state = {
                ...state,
                loading: false,
                color: action.payload.color,
                error: null,
                messages: null,
            };
            break;

        case masterConstants.GET_ALL_MASTER_PRODUCT_STATUS_SUCCESS:
            state = {
                ...state,
                loading: false,
                product_status: action.payload.product_status,
                error: null,
                messages: null,
            };
            break;
        case masterConstants.GET_ALL_MASTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
    }
    return state;
};

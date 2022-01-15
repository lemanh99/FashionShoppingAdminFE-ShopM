import { couponConstants, notificationConstants } from "../../actions/constants";


const initState = {
    notifications: [],
    coupons: [],
    loading: false,
};

export default (state = initState, action) => {
    console.log(action.type);
    switch (action.type) {
        case notificationConstants.NOTIFICATION_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case notificationConstants.NOTIFICATION_SUCCESS:
            state = {
                ...state,
                loading: false,
                notifications: action.payload.notifications,
            };
            break;
        case notificationConstants.NOTIFICATION_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;

        case couponConstants.COUPON_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case couponConstants.COUPON_SUCCESS:
            state = {
                ...state,
                loading: false,
                coupons: action.payload.coupons,
            };
            break;
        case couponConstants.COUPON_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
    }

    return state;
};
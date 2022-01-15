import { notificationUserConstants } from "../../actions/constants";


const initState = {
    notifications: [],
    loading: false,
};

export default (state = initState, action) => {
    console.log(action.type);
    switch (action.type) {
        case notificationUserConstants.NOTIFICATION_USER_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case notificationUserConstants.NOTIFICATION_USER_SUCCESS:
            state = {
                ...initState,
                loading: false,
                notifications: action.payload.notifications,
            };
            break;
        case notificationUserConstants.NOTIFICATION_USER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
    }

    return state;
};
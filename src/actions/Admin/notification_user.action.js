import axiosIntance from "../../helpers/axios";
import { notificationUserConstants } from "../constants";

export const getNotificationUser = () => {
    return async (dispatch) => {
        dispatch({ type: notificationUserConstants.NOTIFICATION_USER_REQUEST });
        const res = await axiosIntance.get(`/notification/user`);
        
        if (res && res.status === 200) {
            const { data } = res.data;
            dispatch({
                type: notificationUserConstants.NOTIFICATION_USER_SUCCESS,
                payload: {
                    notifications: data,
                },
            });
        } else {
            dispatch({
                type: notificationUserConstants.NOTIFICATION_USER_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};
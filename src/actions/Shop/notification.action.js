import { notificationConstants } from "../constants";
import axios from "../../helpers/axios";

export const getListNotification = () => {
    return async (dispatch) => {
        dispatch({ type: notificationConstants.NOTIFICATION_REQUEST });
        const res = await axios.get(`/notification/`);
        if (res && res.status === 200) {
            const { data } = res.data;
            dispatch({
                type: notificationConstants.NOTIFICATION_SUCCESS,
                payload: {
                    notifications: data,
                },
            });
        } else {
            dispatch({
                type: notificationConstants.NOTIFICATION_FAILURE,
                payload: " ",
            });
        }
    };
};

export const createNotification = (form) => {
    return async (dispatch) => {
        const res = await axios.post(`/notification/create`, form);
        if (res && res.status === 200) {
            dispatch(getListNotification());
        }
    };
};
export const updateNotification = (notification) => {
    return async (dispatch) => {
        const res = await axios.put(`/notification/update/${notification.id}`, { ...notification });
        if (res && res.status === 200) {
            dispatch(getListNotification());
        }
    };
};

export const deleteNotification = (id) => {
    return async (dispatch) => {
        const res = await axios.delete(`/notification/delete/${id}`);
        if (res && res.status === 200) {
            dispatch(getListNotification());
        }
    };
};

export const changeVisibleNotification = (notification) => {
    return async (dispatch) => {
        const res = await axios.put(`/notification/active/${notification.id}`, { ...notification });
        if (res && res.status === 200) {
            dispatch(getListNotification());
        }
    };
};
import { couponConstants } from "../constants";
import axios from "../../helpers/axios";

export const getListCoupon = () => {
    return async (dispatch) => {
        dispatch({ type: couponConstants.COUPON_REQUEST });
        const res = await axios.get(`/product/coupon/`);
        if (res && res.status === 200) {
            const { data } = res.data;
            dispatch({
                type: couponConstants.COUPON_SUCCESS,
                payload: {
                    coupons: data,
                },
            });
        } else {
            dispatch({
                type: couponConstants.COUPON_FAILURE,
                payload: " ",
            });
        }
    };
};

export const createCoupon = (form) => {
    return async (dispatch) => {
        const res = await axios.post(`/product/coupon/create/`, form);
        if (res && res.status === 200) {
            dispatch(getListCoupon());
        }
    };
};
export const updateCoupon = (coupon) => {
    return async (dispatch) => {
        const res = await axios.put(`/product/coupon/update/${coupon.id}`, { ...coupon });
        if (res && res.status === 200) {
            dispatch(getListCoupon());
        }
    };
};

export const deleteCoupon = (id) => {
    return async (dispatch) => {
        const res = await axios.delete(`/product/coupon/delete/${id}`);
        if (res && res.status === 200) {
            dispatch(getListCoupon());
        }
    };
};
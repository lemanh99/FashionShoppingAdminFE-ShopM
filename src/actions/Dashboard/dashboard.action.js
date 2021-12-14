import axios from "../../helpers/axios";
import { dasboardConstants } from "../constants";

export const getDashboard = () => {
    return async (dispatch) => {
        dispatch({ type: dasboardConstants.GET_ALL_DASHBOARD_REQUEST });
        const res = await axios.get(`/dashboard`);
        if (res && res.status === 200) {
            const { data } = res.data
            dispatch({
                type: dasboardConstants.GET_ALL_DASHBOARD_SUCCESS,
                payload: {
                    customers: data.customers,
                    products: data.products,
                    orders: data.orders,
                    price_order: data.price_order,
                    shop_month: data.shop_month,
                    top_sell: data.top_sell,
                    graph_views: data.graph_views,
                },
            });
        } else {
            dispatch({
                type: dasboardConstants.GET_ALL_DASHBOARD_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};

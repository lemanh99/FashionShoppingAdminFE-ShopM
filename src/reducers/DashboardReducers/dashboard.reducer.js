import { dasboardConstants } from "../../actions/constants";

const initState = {
  customers: {},
  products: {},
  orders:{},
  price_order:{},
  shop_month:{},
  top_sell:{},
  graph_views:{},
  loading: false,
  error: "",
  messages: "",
};

export default (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case dasboardConstants.GET_ALL_DASHBOARD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case dasboardConstants.GET_ALL_DASHBOARD_SUCCESS:
      state = {
        ...initState,
        loading: false,
        customers: action.payload.customers,
        products: action.payload.products,
        orders:action.payload.orders,
        price_order: action.payload.price_order,
        shop_month:action.payload.shop_month,
        top_sell: action.payload.top_sell,
        graph_views: action.payload.graph_views,
      };
      break;
    case dasboardConstants.GET_ALL_DASHBOARD_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    }
  return state;
};

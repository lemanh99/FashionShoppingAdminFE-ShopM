import { combineReducers } from "redux";
import authReducer from "./AdminReducers/auth.reducers";
import userReducer from "./AdminReducers/user.reducers";
import registerReducer from "./AdminReducers/register.reducers";
import manageAdminReducer from "./AdminReducers/manage_admin.reducers";
import settingAdminReducer from "./AdminReducers/settings.reducers";
import customerReducer from "./CustomerReducers/manage_customer";
import categoryReducer from "./CategoryReducers/manage_category_reducer";
import categoryChildReducer from "./CategoryReducers/category_child";
import brandReducer from "./BrandReducers/manage_brand_reducer";
import productReducer from "./ProductReducers/manage_product";
import productSkuReducer from "./ProductReducers/manage_product_sku";
import orderReducer from "./OrderReducers/order.reducer";
import masterReducer from "./MasterReducers/manage_master";
import dashboardReducer from "./DashboardReducers/dashboard.reducer";
import carrierReducer from "./CarrierReducers/carrier"
import notificationUserReducer from "./AdminReducers/notification_user.reducers"
import shopReducer from "./ShopReducers/shop.reducer"

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  register: registerReducer,
  manage_admin: manageAdminReducer,
  setting_admin: settingAdminReducer,

  customer: customerReducer,
  category: categoryReducer,
  categoryChild: categoryChildReducer,
  brand: brandReducer,
  product: productReducer,
  product_sku: productSkuReducer,
  order: orderReducer,
  master: masterReducer,
  dashboard: dashboardReducer,
  carriers: carrierReducer,
  notificationUser: notificationUserReducer,
  shop: shopReducer,
  // page: pageReducer
});

export default (state, action) => rootReducer(action.type === 'LOGOUT_SUCCESS' ? undefined : state, action);
// LOGOUT_SUCCESS
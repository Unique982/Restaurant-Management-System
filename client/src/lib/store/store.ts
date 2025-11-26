import { combineSlices, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import categorySlice from "./admin/category/categorySlice";
import menuItemsSlice from "./admin/menuItems/menuItemSlice";
import tablesSlice from "./admin/tables/tableSlice";
import usersSlice from "./admin/users/userSlice";
import reservationSlice from "./admin/reservation/reservationSlice";
import orderSlice from "./admin/orders/orderSlice";
import cartSlice from "./customer/cart/cartSlice";
import categoryListSlice from "./customer/category/categorySlice";
import gallerySlice from "./image/gallerySlice";
import serviceSlice from "./services/servicesSlice";
import blogSlice from "./admin/blog/blogSlice";
import contactUs from "./contactUs/contactSlice";
import abourSlice from "./admin/about/aboutSlice";
import settingSlice from "./admin/setting/settingSlice";
import notificationSlice from "./notification/notification";
import chechoutSlice from "./customer/checkout/checkoutSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    menuItems: menuItemsSlice,
    tables: tablesSlice,
    users: usersSlice,
    reservation: reservationSlice,
    order: orderSlice,
    cart: cartSlice,
    categoryList: categoryListSlice,
    gallery: gallerySlice,
    services: serviceSlice,
    blog: blogSlice,
    contact: contactUs,
    about: abourSlice,
    setting: settingSlice,
    notification: notificationSlice,
    checkout: chechoutSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

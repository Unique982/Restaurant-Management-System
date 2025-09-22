import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import categorySlice from "./admin/category/categorySlice";
import menuItemsSlice from "./admin/menuItems/menuItemSlice";
import tablesSlice from "./admin/tables/tableSlice";
import usersSlice from "./admin/users/userSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    menuItems: menuItemsSlice,
    tables: tablesSlice,
    users: usersSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

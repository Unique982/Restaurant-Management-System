import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import categorySlice from "./admin/category/categorySlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { Status } from "@/lib/types/type";
import { cartItems, DeteleAction, IInitialState } from "./cartSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setStatus } from "../../auth/authSlice";
import { AppDispatch } from "../../store";

const initialState: IInitialState = {
  items: [],
  status: Status.LOADING,
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<cartItems[]>) {
      state.items = action.payload;
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setDeleteItem(state, action: PayloadAction<DeteleAction>) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.cart_id
      );
    },
    updateItems(state, action: PayloadAction<cartItems>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.items[index].quantity = action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
  },
});
export const { setItems, setDeleteItem, updateItems } = cartSlice.actions;
export default cartSlice.reducer;

// add cart
export function addCart() {
  return async function addCartThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
  };
}
// fetch all cart
export function fetchCart() {
  return async function fetchCartThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    {
      try {
      } catch (err: any) {}
    }
  };
}
// delete cart
export function deleteCart() {
  return async function deleteCartThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
  };
}
// update cart
export function updateCart() {
  return async function updateCartThubk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
  };
}

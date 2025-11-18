import { Status } from "@/lib/types/type";
import { cartItems, DeteleAction, IInitialState } from "./cartSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import API from "@/lib/http";

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
export const { setItems, setStatus, setDeleteItem, updateItems } =
  cartSlice.actions;
export default cartSlice.reducer;

// add cart
export function addCart(data: cartItems) {
  return async function addCartThunk(dispatch: AppDispatch) {
    const token = localStorage.getItem("token");
    if (!token) {
      let guestCart: cartItems[] = JSON.parse(
        localStorage.getItem("guest_cart") || "[]"
      );

      const existingItem = guestCart.find((item) => item.id === data.id);

      if (existingItem) {
        existingItem.quantity += data.quantity;
      } else {
        guestCart.push(data);
      }

      localStorage.setItem("guest_cart", JSON.stringify(guestCart));

      dispatch(setItems(guestCart));
      dispatch(setStatus(Status.SUCCESS));

      return { success: true, message: "Item added to guest cart" };
    }
    try {
      const response = await API.post("/customer/mycart", data);

      if (response.status === 200 || response.status === 201) {
        dispatch(setItems(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, message: "Item added to user cart" };
      } else {
        dispatch(setStatus(Status.ERROR));
        return {
          success: false,
          message: response.data?.message || "Failed to add to cart",
        };
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        error.response?.data?.message ||
        error.message ||
        error.response?.data?.errors ||
        "Something went wrong";

      return { success: false, message };
    }
  };
}

// fetch all cart
export function fetchCart() {
  return async function fetchCartThunk(dispatch: AppDispatch) {
    const token = localStorage.getItem("token");
    if (!token) {
      const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");

      dispatch(setItems(guestCart));
      dispatch(setStatus(Status.SUCCESS));
      return { success: true };
    }
    dispatch(setStatus(Status.LOADING));
    {
      try {
        const response = await API.get(`/customer/mycart`);
        if (response.status === 200) {
          dispatch(setItems(response.data.data));
          dispatch(setStatus(Status.SUCCESS));
          return { success: true };
        } else {
          dispatch(setStatus(Status.ERROR));
          return { message: response.data?.message || "Failed" };
        }
      } catch (err: any) {
        dispatch(setStatus(Status.ERROR));
        const message =
          err.response?.data?.message ||
          err.message ||
          err.response?.data?.errors ||
          "Something went wrong";
        return { success: false, message };
      }
    }
  };
}
export function mergeGuestCartAfterLogin() {
  return async function mergeCartThunk(dispatch: AppDispatch) {
    const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
    if (!guestCart || guestCart.length === 0) return;
    try {
      for (const item of guestCart) {
        await dispatch(addCart(item));
      }
      localStorage.removeItem("guest_cart");
      console.log("Guest cart merged successfully!");
    } catch (error) {
      console.error("Error merging guest cart:", error);
    }
  };
}

// delete cart
export function deleteCart(cart_id: number) {
  return async function deleteCartThunk(dispatch: AppDispatch) {
    const token = localStorage.getItem("token");
    if (!token) {
      const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");

      const updated = guestCart.filter((i: cartItems) => i.id !== cart_id);
      localStorage.setItem("guest_cart", JSON.stringify(updated));
      dispatch(setItems(updated));
      dispatch(setStatus(Status.SUCCESS));
      return { success: true };
    }
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.delete(`customer/mycart/${cart_id}`);

      if (response.status === 200) {
        dispatch(setDeleteItem({ cart_id }));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { message: response.data?.message || "Failed" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message ||
        err.message ||
        err.response?.data?.errors ||
        "Something went wrong";
      return { success: false, message };
    }
  };
}

// update cart
export function updateCart(cartItems: { id: number; quantity: number }) {
  return async function updateCartThunk(dispatch: AppDispatch) {
    const token = localStorage.getItem("token");
    if (!token) {
      const guestCart: cartItems[] = JSON.parse(
        localStorage.getItem("guest_cart") || "[]"
      );
      const index = guestCart.findIndex(
        (i: cartItems) => i.id === cartItems.id
      );
      if (index >= 0) guestCart[index].quantity = cartItems.quantity;
      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
      dispatch(setItems(guestCart));
      dispatch(setStatus(Status.SUCCESS));
      return { success: true };
    }
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.patch(`customer/mycart/${cartItems.id}`, {
        quantity: cartItems.quantity,
      });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        return { success: true };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { message: response.data?.message || "Failed" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message ||
        err.message ||
        err.response?.data?.errors ||
        "Something went wrong";
      return { success: false, message };
    }
  };
}

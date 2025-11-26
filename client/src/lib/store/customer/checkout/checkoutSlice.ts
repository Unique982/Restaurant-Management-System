import { Status } from "@/lib/types/type";
import {
  IIOrderItems,
  IIUserOrderData,
  IOrderItem,
  PaymentMethod,
} from "../../admin/orders/orders.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IData } from "./checkoutSlice.type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

export interface ICheckoutForm {
  name: "";
  phone: string;
  email: string;
  city: string;
  zip_code: string;
  delivery_address: string;
  totalAmount?: number;
  payment_method: PaymentMethod;
}

interface ICustomerOrderState {
  status: Status;
  items: IOrderItem[];
  khaltiUrl: string | null;
  orderDetails: IIUserOrderData[] | null;
}
const initialState: ICustomerOrderState = {
  status: Status.LOADING,
  items: [],
  khaltiUrl: null,
  orderDetails: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setItems(state: ICustomerOrderState, action: PayloadAction<IOrderItem[]>) {
      state.items = action.payload;
    },
    setOrderDetails(state, action: PayloadAction<IIUserOrderData[]>) {
      state.orderDetails = action.payload;
    },
    // set khaltl url
    setKhaltiUrl(state, action: PayloadAction<string>) {
      state.khaltiUrl = action.payload;
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    // clear garnu paro checkout state after sucess vya paxi
    clearCheckout(state) {
      (state.items = []),
        (state.khaltiUrl = null),
        (state.orderDetails = null),
        (state.status = Status.LOADING);
    },
  },
});
export const {
  setItems,
  setOrderDetails,
  setKhaltiUrl,
  setStatus,
  clearCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

export function orderItems(data: IData) {
  return async function orderItemsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post("customer/myOrder", data);
      if (response.status === 200) {
        response.data.data && dispatch(setItems(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        console.log(response.data.payment_url, "url");
        if (response.data.payment_url) {
          dispatch(setKhaltiUrl(response.data.payment_url));
          window.location.href = response.data.payment_url;
        }
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

export function fetchMyOrders() {
  return async function fetchMyOrdersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("customer/myOrder");
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
  };
}

export function fetchMyOrdersDetails() {
  return async function fetchMyOrdersDetails(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("customer/myOrder");
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
  };
}

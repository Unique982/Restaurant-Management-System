import { Status } from "@/lib/types/type";
import {
  IInitialState,
  IIOrderItems,
  IOrderItem,
  IOrderPostData,
} from "./orders.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { id } from "zod/v4/locales";
import API from "@/lib/http";
import { success } from "zod";

const initialState: IInitialState = {
  orderDatas: [],
  status: Status.LOADING,
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    addOrder(state: IInitialState, action: PayloadAction<IIOrderItems>) {
      state.orderDatas.push(action.payload);
    },
    fetchOrder(state: IInitialState, action: PayloadAction<IIOrderItems[]>) {
      state.orderDatas = action.payload;
    },
    // soft Delete
    softDeleteOrderById(
      state: IInitialState,
      action: PayloadAction<string | number>
    ) {
      const orderId = state.orderDatas.find(
        (order) => order.id === action.payload
      );
      if (orderId) {
        orderId.deleted_at = true;
      }
    },
    // hard delete by order id
    hardDeleteOrderById(
      state: IInitialState,
      action: PayloadAction<string | number>
    ) {
      const orderId = action.payload;
      const index = state.orderDatas.findIndex((order) => order.id === orderId);
      if (index !== -1) {
        state.orderDatas.splice(index, 1);
      }
    },
  },
});
export const {
  setStatus,
  addOrder,
  softDeleteOrderById,
  hardDeleteOrderById,
  fetchOrder,
} = orderSlice.actions;
export default orderSlice.reducer;

// add function
export function createOrders(data: IOrderPostData) {
  return async function createOrdersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("order", data);
      if (response.status === 200) {
        response.data.data && dispatch(addOrder(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { message: response.data?.message || "Failed!" };
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
// soft delete function
export function softDeleteOrder(id: string | number) {
  return async function softDeleteOrderThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const deletedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
      const response = await API.patch(`order/soft-delete/${id}`, {
        deleted_at: deletedAt,
      });
      if (response.status === 200) {
        dispatch(softDeleteOrderById(id));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
// hardDelete function
export function hardDeleteOrder(id: string | number) {
  return async function hardDeleteOrderThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.delete("order/" + id);
      if (response.status === 200) {
        dispatch(hardDeleteOrderById(id));
        dispatch(setStatus(Status.SUCCESS));
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
// fetch function
export function getALlOrderList() {
  return async function getALlOrderListThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get("order");
      if (response.status === 200) {
        response.data.data.length > 0 &&
          dispatch(fetchOrder(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
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

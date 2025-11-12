import { Status } from "@/lib/types/type";
import {
  IInitialState,
  IIOrderItems,
  IOrderPostData,
  OrderStatus,
  OrderType,
} from "./orders.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

const initialState: IInitialState = {
  orderDatas: [],
  status: Status.LOADING,
  singleOrder: null,
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
    fectchSingleOrder(
      state: IInitialState,
      action: PayloadAction<IIOrderItems | null>
    ) {
      state.singleOrder = action.payload;
    },
    // soft Delete
    softDeleteOrderById(
      state: IInitialState,
      action: PayloadAction<string | number>
    ) {
      const orderId = state.orderDatas.find(
        (order) => order.order_id === action.payload
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
      const index = state.orderDatas.findIndex(
        (order) => order.order_id === orderId
      );

      if (index !== -1) {
        state.orderDatas.splice(index, 1);
      }
    },

    // order status chnage
    updateOrderStatusById(
      state: IInitialState,
      action: PayloadAction<{ id: string | number; status: OrderStatus }>
    ) {
      const { id, status } = action.payload;
      const order = state.orderDatas.find((o) => o.order_id === id);
      if (order) {
        order.status = status;
      }
    },
    // order type status
    updateOrderTypeById(
      state: IInitialState,
      action: PayloadAction<{ id: string | number; order_type: OrderType }>
    ) {
      const { id, order_type } = action.payload;
      const order = state.orderDatas.find((o) => o.order_id === id);
      if (order) {
        order.order_type = order_type;
      }
    },
    updateOrderById(state: IInitialState, action: PayloadAction<IIOrderItems>) {
      const index = state.orderDatas.findIndex(
        (o) => o.order_id === action.payload.order_id
      );

      if (index !== -1) {
        state.orderDatas[index] = action.payload;
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
  updateOrderStatusById,
  updateOrderTypeById,
  fectchSingleOrder,
  updateOrderById,
} = orderSlice.actions;
export default orderSlice.reducer;

// add function
export function createOrders(data: IOrderPostData) {
  return async function createOrdersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post("order", data);
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
      const response = await APIWITHTOKEN.patch(`order/soft-delete/` + id, {
        deleted_at: deletedAt,
      });
      if (response.status === 200) {
        dispatch(softDeleteOrderById(id));
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
// hardDelete function
export function hardDeleteOrder(id: string | number) {
  return async function hardDeleteOrderThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.delete("order/" + id);
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
      const response = await APIWITHTOKEN.get("order");
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

// order status update
export function orderStatusUpdate(id: string | number, status: OrderStatus) {
  return async function orderStatusUpdate(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(`/order/status/${id}`, {
        id,
        status,
      });
      if (response.status === 200) {
        dispatch(updateOrderStatusById({ id, status }));
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

// order type update
export function orderTypeUpdate(id: string | number, order_type: OrderType) {
  return async function orderTypeUpdateThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(`/order/types/status/${id}`, {
        order_type,
      });
      if (response.status === 200) {
        dispatch(updateOrderTypeById({ id, order_type }));
        dispatch(setStatus(Status.SUCCESS));
        return { data: response.data, success: true };
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

// single order
export function singelFetchOrder(id: string | number) {
  return async function singelCategoryFetchByIdThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.ERROR));
    try {
      const response = await APIWITHTOKEN.get("/order/" + id);
      if (response.status === 200) {
        dispatch(singelFetchOrder(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: "Order not found" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message || err.message || "Something went wrong";
      return { success: false, message };
    }
  };
}

// edit order
export function editOrderById(id: string | number, data: IOrderPostData) {
  return async function editCategoryById(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch("/orders/" + id, data);
      if (response.status === 200) {
        response.data.data && dispatch(updateOrderById(response.data.data));
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

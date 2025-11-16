import { Status } from "@/lib/types/type";
import { IInitialState, IOrderPostData } from "../../admin/orders/orders.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Payload } from "recharts/types/component/DefaultLegendContent";

const initialState: IInitialState = {
  orderDatas: [],
  status: Status.LOADING,
  singleOrder: null,
};

// const myOrder = createSlice({
//   name: "myOrder",
//   initialState,
//   reducers: {
//     getMyOrder(state:IInitialState,action:PayloadAction<IOrderPostData>)
//   },
// });

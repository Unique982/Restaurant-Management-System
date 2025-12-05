import { Status } from "@/lib/types/type";
import { IInitialState, IPayment } from "./paymentSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

const initialState: IInitialState = {
  status: Status.LOADING,
  paymentData: [],
  singlePayment: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    fetchAllList(state: IInitialState, action: PayloadAction<IPayment[]>) {
      state.paymentData = action.payload;
    },
    setSinglePayment(
      state: IInitialState,
      action: PayloadAction<IPayment | null>
    ) {
      state.singlePayment = action.payload;
    },
  },
});
export const { setStatus, fetchAllList, setSinglePayment } =
  paymentSlice.actions;
export default paymentSlice.reducer;

// fecth all payment

export function fetchAllPayment() {
  return async function fetchAllPaymentThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("/payment");
      if (response.status === 200) {
        dispatch(fetchAllList(response.data.data));
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
export function singlePaymentGet(id: string | number) {
  return async function singlePaymentGetThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get(`/payment/${id}`);
      if (response.status === 200) {
        dispatch(setSinglePayment(response.data.data));
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

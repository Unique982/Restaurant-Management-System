import { Status } from "@/lib/types/type";
import { IInitialState, serviceItems } from "./servicesSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { de } from "zod/v4/locales";
import { AppDispatch } from "../store";
import API from "@/lib/http";

const initialState: IInitialState = {
  data: [],
  status: Status.LOADING,
};

const serviceSlice = createSlice({
  name: "serviceSlice",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    fetchService(state: IInitialState, action: PayloadAction<serviceItems[]>) {
      state.data = action.payload;
    },
  },
});
export const { setStatus, fetchService } = serviceSlice.actions;
export default serviceSlice.reducer;

// fetch services data
export function fetchServices() {
  return async function fetchServicesThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`/service`);
      if (response.status === 200) {
        dispatch(fetchService(response.data.data));
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

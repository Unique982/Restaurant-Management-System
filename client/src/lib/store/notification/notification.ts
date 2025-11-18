import { Status } from "@/lib/types/type";
import { IInitialState, INotificationType } from "./notification.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

const initialState: IInitialState = {
  notificationData: [],
  status: Status.LOADING,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setNotification(
      state: IInitialState,
      action: PayloadAction<INotificationType[]>
    ) {
      state.notificationData = action.payload;
    },
  },
});
export const { setNotification, setStatus } = notificationSlice.actions;
export default notificationSlice.reducer;

// fetch all notification
export function fetchNotification() {
  return async function fetchNotificationThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("/notification");
      if (response.status === 200) {
        dispatch(setNotification(response.data.data));
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

// make all read
export function makeAllRead() {
  return async function makeAllReadThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch("/notification/read-all");
      if (response.status === 200) {
        dispatch(fetchNotification());
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

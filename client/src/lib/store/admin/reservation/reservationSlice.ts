import { Status } from "@/lib/types/type";
import {
  IInitialState,
  IIReservation,
  IReservationPostData,
  ReservationStatus,
} from "./reservationSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
import API from "@/lib/http";
const initialState: IInitialState = {
  reservationData: [],
  status: Status.LOADING,
};
const reservationSlice = createSlice({
  name: "reservationSlice",
  initialState,
  reducers: {
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    addReservation(state: IInitialState, action: PayloadAction<IIReservation>) {
      state.reservationData.push(action.payload);
    },
    fetchReservation(
      state: IInitialState,
      action: PayloadAction<IIReservation[]>
    ) {
      state.reservationData = action.payload;
    },
    deleteReservationById(
      state: IInitialState,
      action: PayloadAction<string | number>
    ) {
      const reservationId = action.payload;
      const index = state.reservationData.findIndex(
        (reservation) => reservation.id === reservationId
      );
      if (index !== -1) {
        state.reservationData.splice(index, 1);
      }
    },
    updateStatus(
      state: IInitialState,
      action: PayloadAction<{ id: string | number; status: ReservationStatus }>
    ) {
      const { id, status } = action.payload;
      const reservation = state.reservationData.find(
        (reservation) => reservation.id === id
      );
      if (reservation) {
        reservation.status = status;
      }
    },
  },
});
export const {
  setStatus,
  addReservation,
  fetchReservation,
  deleteReservationById,
  updateStatus,
} = reservationSlice.actions;
export default reservationSlice.reducer;

//
export function createReservation(data: IReservationPostData) {
  return async function createReservationThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post("reservations", data);
      if (response.status === 200) {
        response.data.data && dispatch(addReservation(response.data.data));
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

// fetch reservation list
export function getReservation() {
  return async function getReservationThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("reservations");
      if (response.status === 200) {
        response.data.data.length > 0 &&
          dispatch(fetchReservation(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return true;
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// delete method
export function deleteReservation(id: string | number) {
  return async function deleteReservationThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.delete("reservations/" + id);
      if (response.status === 200) {
        dispatch(deleteReservationById(id));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true };
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

export function statusUpdate(id: string | number, status: ReservationStatus) {
  return async function statusUpdateThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(`/reservations/status/${id}`, {
        status,
      });
      if (response.status === 200) {
        dispatch(updateStatus({ id, status }));
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
export function bookingTable(data: IReservationPostData) {
  return async function bookinhgTableThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/booking/table", data);
      if (response.status === 200) {
        response.data.data && dispatch(addReservation(response.data.data));
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

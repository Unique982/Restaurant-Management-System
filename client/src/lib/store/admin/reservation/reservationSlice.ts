import { Status } from "@/lib/types/type";
import {
  IInitialState,
  IIReservation,
  IReservationPostData,
} from "./reservationSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRegisterData } from "../../auth/authSlice.type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http";

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
  },
});
export const {
  setStatus,
  addReservation,
  fetchReservation,
  deleteReservationById,
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
        return true;
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
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
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

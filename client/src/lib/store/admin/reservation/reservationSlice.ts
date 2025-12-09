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
  singleDetails: null,
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
    fectchSingleReservation(
      state: IInitialState,
      action: PayloadAction<IIReservation | null>
    ) {
      state.singleDetails = action.payload;
    },
    // soft Delete
    softDeleteResvById(
      state: IInitialState,
      action: PayloadAction<string | number>
    ) {
      const ResvId = state.reservationData.find(
        (resv) => resv.id === action.payload
      );
      if (ResvId) {
        ResvId.deleted_at = true;
      }
    },
    // hard delete by order id
    hardDeleteResvById(
      state: IInitialState,
      action: PayloadAction<string | number>
    ) {
      const resvId = action.payload;
      const index = state.reservationData.findIndex(
        (resv) => resv.id === resvId
      );

      if (index !== -1) {
        state.reservationData.splice(index, 1);
      }
    },
    updateResvById(state: IInitialState, action: PayloadAction<IIReservation>) {
      const index = state.reservationData.findIndex(
        (resv) => resv.id === action.payload.id
      );

      if (index !== -1) {
        state.reservationData[index] = action.payload;
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
  fectchSingleReservation,
  softDeleteResvById,
  hardDeleteResvById,
  updateResvById,
} = reservationSlice.actions;
export default reservationSlice.reducer;

//create reservation
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

export function getReservation() {
  return async function getALlOrderListThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("reservations");
      if (response.status === 200) {
        response.data.data.length > 0 &&
          dispatch(fetchReservation(response.data.data));
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

// customer and guest user side
export function bookingTable(data: IReservationPostData) {
  return async function bookinhgTableThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post("/booking/table", data);
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
export function softDeleteResv(id: string | number) {
  return async function softDeleteResvThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const deletedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
      const response = await APIWITHTOKEN.patch(
        `reservations/soft-delete/` + id,
        {
          deleted_at: deletedAt,
        }
      );
      if (response.status === 200) {
        dispatch(softDeleteResvById(id));
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
export function hardDeleteResv(id: string | number) {
  return async function hardDeleteResvThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.delete("reservations/" + id);
      if (response.status === 200) {
        dispatch(hardDeleteResvById(id));
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
export function singelFetchResv(id: string | number) {
  return async function singelFetchResvThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.ERROR));
    try {
      const response = await APIWITHTOKEN.get("/reservations/" + id);
      if (response.status === 200) {
        dispatch(singelFetchResv(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: "Reservation not found" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message || err.message || "Something went wrong";
      return { success: false, message };
    }
  };
}
// edit resverstion
export function editResvById(id: string | number, data: IReservationPostData) {
  return async function editResvByIdThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch("reservations/" + id, data);
      if (response.status === 200) {
        response.data.data && dispatch(updateResvById(response.data.data));
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

import { Status } from "@/lib/types/type";
import {
  IInitialState,
  postServiceItems,
  serviceItems,
} from "./servicesSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import API from "@/lib/http";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

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
    addService(state: IInitialState, action: PayloadAction<serviceItems>) {
      state.data.push(action.payload);
    },
    serviceDeletedIdBy(
      state: IInitialState,
      action: PayloadAction<string | number>
    ) {
      const serviceId = action.payload;
      const index = state.data.findIndex((serv) => serv.id === serviceId);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
    updateService(state: IInitialState, action: PayloadAction<serviceItems>) {
      const index = state.data.findIndex((s) => s.id === action.payload.id);

      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
});
export const {
  setStatus,
  fetchService,
  serviceDeletedIdBy,
  addService,
  updateService,
} = serviceSlice.actions;
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
// admin side adding
export function serviceAdded(data: postServiceItems) {
  return async function serviceAddedThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post(`/service`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        dispatch(addService(response.data.data));
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
// delete
export function deleteServiceIdBy(id: string | number) {
  return async function deleteServiceIdByThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.delete(`/service/${id}`);
      if (response.status === 200) {
        dispatch(serviceDeletedIdBy(id));
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
export function editServiceById(id: string | number, data: postServiceItems) {
  return async function editServiceById(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(`/service/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        response.data.data && dispatch(updateService(response.data.data));
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

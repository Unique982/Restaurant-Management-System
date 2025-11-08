import { Status } from "@/lib/types/type";
import { IAbout, IAboutPost, IInitialState } from "./aboutSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import API from "@/lib/http";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

const initialState: IInitialState = {
  about: [],
  status: Status.LOADING,
};

const aboutSlice = createSlice({
  name: "aboutSlice",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    fetchAbout(state: IInitialState, action: PayloadAction<IAbout[]>) {
      state.about = action.payload;
    },
    addAbout(state: IInitialState, action: PayloadAction<IAbout>) {
      state.about.push(action.payload);
    },
  },
});

export const { setStatus, fetchAbout, addAbout } = aboutSlice.actions;
export default aboutSlice.reducer;

export function aboutFetch() {
  return async function aboutFetchThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`/about`);
      if (response.status === 200) {
        dispatch(fetchAbout(response.data.data));
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
export function aboutAdd(about: IAboutPost) {
  return async function aboutAddThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post(`/about`, about, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        dispatch(addAbout(response.data.data));
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
export function singleAbout(id: string | number) {
  return async function singleAboutThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`/about` + id);
      if (response.status === 200) {
        dispatch(fetchAbout(response.data.data));
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

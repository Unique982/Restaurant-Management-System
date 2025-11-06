import { Status } from "@/lib/types/type";
import {
  IInitialState,
  IISetting,
  ISettingPostData,
} from "./settingSlice.type";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

const initialState: IInitialState = {
  setting: [],
  status: Status.LOADING,
};

const settingSlice = createSlice({
  name: "settingSlice",
  initialState,
  reducers: {
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setSetting(state: IInitialState, action: PayloadAction<IISetting[]>) {
      state.setting = action.payload;
    },
  },
});

export const { setStatus, setSetting } = settingSlice.actions;
export default settingSlice.reducer;

export function addSettings(data: ISettingPostData) {
  return async function addSettingsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post(`/setting`, data);
      if (response.status === 200) {
        dispatch(setSetting(response.data.data));
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

export function settingFetch() {
  return async function settingFetchThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get(`/setting`);
      if (response.status === 200) {
        dispatch(setSetting(response.data.data));
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

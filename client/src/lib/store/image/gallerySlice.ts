import { Status } from "@/lib/types/type";
import { GalleryItems, GalleryList } from "./gallerySlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../store";
import API from "@/lib/http";

const initialState: GalleryList = {
  data: [],
  status: Status.LOADING,
};
const gallerySlice = createSlice({
  name: "gallerySlice",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<GalleryItems[]>) {
      state.data = action.payload;
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});
export const { setItems, setStatus } = gallerySlice.actions;
export default gallerySlice.reducer;

//fetch galley image
export function fetchGallery() {
  return async function fetchGalleryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`/gallery`);
      if (response.status === 200) {
        dispatch(setItems(response.data.data));
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

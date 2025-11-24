import { Status } from "@/lib/types/type";
import { GalleryItems, GalleryList } from "./gallerySlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../store";
import API from "@/lib/http";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

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
    addGallery(state, action: PayloadAction<GalleryItems>) {
      state.data.push(action.payload);
    },
    removeGallery(state, action: PayloadAction<string | number>) {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});
export const { setItems, setStatus, addGallery, removeGallery } =
  gallerySlice.actions;
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
export function addImages(data: FormData) {
  return async function addImagesThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post("gallery", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        dispatch(addGallery(response.data.data));
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
export function deleteGallery(id: string | number) {
  return async function deleteGalleryThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete(`/gallery/${id}`);

      if (response.status === 200) {
        dispatch(removeGallery(id));
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      return { success: false };
    }
  };
}

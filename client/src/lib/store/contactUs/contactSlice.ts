import { Status } from "@/lib/types/type";
import { IContactUs, IContactUsPost, IInitialState } from "./contactSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import API from "@/lib/http";
const initialState: IInitialState = {
  data: [],
  status: Status.LOADING,
};

const contactSlice = createSlice({
  name: "contactUsSlice",
  initialState,
  reducers: {
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    addContact(state: IInitialState, action: PayloadAction<IContactUs>) {
      state.data.push(action.payload);
    },
  },
});

export const { setStatus, addContact } = contactSlice.actions;
export default contactSlice.reducer;

// add
export function addContactUs(data: IContactUsPost) {
  return async function addContactUsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/contact", data);
      if (response.status === 200) {
        dispatch(addContactUs(response.data.data));
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

import { Status } from "@/lib/types/type";
import { IContactUs, IContactUsPost, IInitialState } from "./contactSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import API from "@/lib/http";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
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
    fetchContact(state: IInitialState, action: PayloadAction<IContactUs[]>) {
      state.data = action.payload;
    },
    contactReply(
      state: IInitialState,
      action: PayloadAction<{ id: string | number }>
    ) {
      const contact = state.data.find((c) => c.id === action.payload.id);
      if (contact) contact.isReplied = true;
    },
  },
});

export const { setStatus, addContact, fetchContact, contactReply } =
  contactSlice.actions;
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
// fetch all contect list only admin
export function fetchContactAllUser() {
  return async function fetchContactAllUserThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("/inquery/contact");
      if (response.status === 200) {
        dispatch(fetchContact(response.data.data));
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

// send reply email
export function sendReply(data: {
  id: string | number;
  email: string;
  subject: string;
  message: string;
}) {
  return async function sendReplyThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(`/inquery/contact/${data.id}`, {
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
      if (response.status === 200) {
        dispatch(contactReply({ id: data.id }));
        dispatch(fetchContact(response.data.data));
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

import { Status } from "@/lib/types/type";

import { IInitialState, IUserList } from "./userSlice.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

const initialState: IInitialState = {
  usersData: [],
  status: Status.LOADING,
  singleDetails: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    fetchUser(state: IInitialState, action: PayloadAction<IUserList[]>) {
      state.usersData = action.payload;
    },
    deleteUserById(
      state: IInitialState,
      action: PayloadAction<String | number>
    ) {
      const userId = action.payload;
      const index = state.usersData.findIndex((users) => users.id === userId);
      if (index !== -1) {
        state.usersData.splice(index, 1);
      }
    },
    fectchSingleUser(
      state: IInitialState,
      action: PayloadAction<IUserList | null>
    ) {
      state.singleDetails = action.payload;
    },
  },
});
export const { setStatus, fetchUser, deleteUserById, fectchSingleUser } =
  userSlice.actions;
export default userSlice.reducer;

// fetch function method
export function getUserList() {
  return async function getUserListThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("/customer");
      if (response.status === 200) {
        response.data.data.length > 0 &&
          dispatch(fetchUser(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
// delete function
export function deleteUser(id: string | number) {
  return async function deleteUserThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.delete("customer/" + id);
      if (response.status === 200) {
        dispatch(deleteUserById(id));
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
export function singelFetchUser(id: string | number) {
  return async function singelFetchUserThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.ERROR));
    try {
      const response = await APIWITHTOKEN.get("customer/" + id);
      if (response.status === 200) {
        dispatch(singelFetchUser(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: "User not found" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message || err.message || "Something went wrong";
      return { success: false, message };
    }
  };
}

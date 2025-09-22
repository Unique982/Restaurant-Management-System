import { Status } from "@/lib/types/type";

import { IInitialState, IUserList } from "./userSlice.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import API from "@/lib/http";

const initailState: IInitialState = {
  usersData: [],
  status: Status.LOADING,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initailState,
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
  },
});
export const { setStatus, fetchUser, deleteUserById } = userSlice.actions;
export default userSlice.reducer;

// fetch function method
export function getUserList() {
  return async function getUserListThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get("/customer");
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
      const response = await API.delete("customer/" + id);
      if (response.status === 200) {
        dispatch(deleteUserById(id));
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

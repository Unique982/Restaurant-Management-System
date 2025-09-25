import { Status } from "@/lib/types/type";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import API from "@/lib/http";
import {
  IInitialState,
  IMenuItems,
  IMenuItemsData,
} from "./menuItemSlice.type";
import { success } from "zod";

const initialState: IInitialState = {
  menuDatas: [],
  status: Status.LOADING,
};
const menuItemSlice = createSlice({
  name: "menuItems",
  initialState,
  reducers: {
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    addMenuItems(state: IInitialState, action: PayloadAction<IMenuItems>) {
      state.menuDatas.push(action.payload);
    },
    fetchMenuItems(state: IInitialState, action: PayloadAction<IMenuItems[]>) {
      state.menuDatas = action.payload;
    },
    deleteMenuItemById(
      state: IInitialState,
      action: PayloadAction<String | number>
    ) {
      const menuId = action.payload;
      const index = state.menuDatas.findIndex((menu) => menu.id === menuId);
      if (index !== -1) {
        state.menuDatas.splice(index, 1);
      }
    },
  },
});
export const { setStatus, addMenuItems, fetchMenuItems, deleteMenuItemById } =
  menuItemSlice.actions;
export default menuItemSlice.reducer;

// create menu items
export function createMenuItems(data: IMenuItemsData) {
  return async function addMenuItemsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("menu", data);
      if (response.status === 200) {
        response.data.menuDatas && dispatch(addMenuItems(response.data.data));
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
// get Mneu items
export function getMenuItem() {
  return async function getMenuItem(dispatch: AppDispatch) {
    try {
      const response = await API.get("menu");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        response.data.data && dispatch(fetchMenuItems(response.data.data));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
// delete menu items
export function deletemenuItem(id: string | number) {
  return async function deleteMenuItemByIdThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.delete("menu/" + id);
      if (response.status === 200) {
        dispatch(deleteMenuItemById(id));
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// single menu item and edit menu item

import { Status } from "@/lib/types/type";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import API from "@/lib/http";
import {
  IInitialState,
  IMenuItems,
  IMenuItemsData,
} from "./menuItemSlice.type";

const initialState: IInitialState = {
  data: [],
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
      state.data.push(action.payload);
    },
    fetchMenuItems(state: IInitialState, action: PayloadAction<IMenuItems[]>) {
      state.data = action.payload;
    },
    deleteMenuItemById(state: IInitialState, action: PayloadAction<string>) {
      const menuId = action.payload;
      const index = state.data.findIndex((menu) => menu.id === menuId);
      if (index !== -1) {
        state.data.splice(index, 1);
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
        response.data.data && dispatch(addMenuItems(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return true;
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
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
export function deletemenuItem(id: string) {
  return async function deleteMenuItemByIdThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.delete("/menu/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(deleteMenuItemById(id));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// single menu item and edit menu item

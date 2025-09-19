import { Status } from "@/lib/types/type";
import { IInitialState, ITables, ITablesData } from "./tableSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { table } from "console";
import { AppDispatch } from "../../store";
import API from "@/lib/http";

const initialState: IInitialState = {
  data: [],
  status: Status.LOADING,
};
const tableSlice = createSlice({
  name: "TableSlice",
  initialState,
  reducers: {
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    addTable(state: IInitialState, action: PayloadAction<ITables>) {
      state.data.push(action.payload);
    },
    fetchTbales(state: IInitialState, action: PayloadAction<ITables[]>) {
      state.data = action.payload;
    },
    deleteTableById(
      state: IInitialState,
      action: PayloadAction<String | number>
    ) {
      const tableId = action.payload;
      const index = state.data.findIndex((tables) => tables.id === tableId);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
  },
});
export const { setStatus, addTable, deleteTableById, fetchTbales } =
  tableSlice.actions;
export default tableSlice.reducer;

// add
export function createTables(data: ITablesData) {
  return async function createTablesThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/tables");
      if (response.status === 200) {
        response.data.data && dispatch(addTable(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function getTables() {
  return async function getTablesThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get("tables");
      if (response.status === 200) {
        response.data.data.length > 0 &&
          dispatch(fetchTbales(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteTablesById(id: string | number) {
  return async function deleteTableByIdThubk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.delete("tables/" + id);
      if (response.status === 200) {
        dispatch(deleteTableById(id));
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoryData, IInitialState } from "./categorySlice.type";
import { Status } from "@/lib/types/type";
import { AppDispatch } from "../../store";
import API from "@/lib/http";

const initialState: IInitialState = {
  data: [],
  status: Status.LOADING,
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state: IInitialState, action: PayloadAction<ICategoryData>) {
      state.data.push(action.payload);
    },
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setCategory, setStatus } = categorySlice.actions;
export default categorySlice.reducer;

//  add
export function addCategory() {
  return async function addCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await API.post("/category");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        response.data.data.length > 0 &&
          dispatch(setCategory(response.data.data));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
// fetch
export function getCategory() {
  return async function getCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/category");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
// delete
// edit
// single category

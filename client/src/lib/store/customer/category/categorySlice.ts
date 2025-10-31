import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "@/lib/types/type";
import { AppDispatch } from "../../store";
import { ICategoryList, IInitialState } from "./categorySlice.types";
import axios from "axios";

const initialState: IInitialState = {
  data: [],
  status: Status.LOADING,
};
const categoryListSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    categoryFetch(
      state: IInitialState,
      action: PayloadAction<ICategoryList[]>
    ) {
      state.data = action.payload;
    },
  },
});

export const { setStatus, categoryFetch } = categoryListSlice.actions;
export default categoryListSlice.reducer;

// fetch
export function getCategory() {
  return async function getCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await axios.get("http://localhost:4000/category");
      if (response.status === 200) {
        response.data.data.length > 0 &&
          dispatch(categoryFetch(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return true;
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

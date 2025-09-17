import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory, ICategoryData, IInitialState } from "./categorySlice.type";
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
    setCategory(state: IInitialState, action: PayloadAction<ICategory>) {
      state.data.push(action.payload);
    },
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    fetchCategory(state: IInitialState, action: PayloadAction<ICategory[]>) {
      state.data = action.payload;
    },
    setCategoryDeleteById(state: IInitialState, action: PayloadAction<string>) {
      const catgeoryId = action.payload;
      const index = state.data.findIndex(
        (category) => category.id === catgeoryId
      );
      if (index !== -1) {
        state.data.slice(index, 1);
      }
    },
  },
});

export const { setCategory, setStatus, fetchCategory, setCategoryDeleteById } =
  categorySlice.actions;
export default categorySlice.reducer;

//  add
export function addCategory(data: ICategoryData) {
  return async function addCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/category", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        response.data.data && dispatch(setCategory(response.data.data));
        return true;
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
      const response = await API.get("category");
      if (response.status === 200) {
        response.data.data.length > 0 &&
          dispatch(fetchCategory(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
// delete
export function deleteCategoryById(id: string) {
  return async function deleteCategoryByIdThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.delete("/category/" + id);
      if (response.status === 200) {
        dispatch(setCategoryDeleteById(id));
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
// edit
export function editCategoryById(id: string) {
  return async function editCategoryById(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.patch("/category/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
// single category
export function singelCategoryFetchById(id: string) {
  return async function singelCategoryFetchByIdThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.ERROR));
    try {
      const response = await API.get("/category/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory, ICategoryData, IInitialState } from "./categorySlice.type";
import { Status } from "@/lib/types/type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

const initialState: IInitialState = {
  data: [],
  singlecategory: null,
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
    setCategoryDeleteById(
      state: IInitialState,
      action: PayloadAction<string | number>
    ) {
      const catgeoryId = action.payload;
      const index = state.data.findIndex(
        (category) => category.id === catgeoryId
      );
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
    setSingleCategory(
      state: IInitialState,
      action: PayloadAction<ICategory | null>
    ) {
      state.singlecategory = action.payload;
    },
    updateCategory(state: IInitialState, action: PayloadAction<ICategory>) {
      const index = state.data.findIndex(
        (category) => category.id === action.payload.id
      );

      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
});

export const {
  setCategory,
  setStatus,
  fetchCategory,
  setCategoryDeleteById,
  updateCategory,
  setSingleCategory,
} = categorySlice.actions;
export default categorySlice.reducer;

//  add
export function addCategory(data: ICategoryData) {
  return async function addCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post("/category", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        response.data.data && dispatch(setCategory(response.data.data));
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
// fetch
export function getCategory() {
  return async function getCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("/category");
      if (response.status === 200) {
        response.data.data.length > 0 &&
          dispatch(fetchCategory(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return true;
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// delete
export function deleteCategoryById(id: string | number) {
  return async function deleteCategoryByIdThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.delete("/category/" + id);
      if (response.status === 200) {
        dispatch(setCategoryDeleteById(id));
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

// edit
export function editCategoryById(id: string | number, data: ICategoryData) {
  return async function editCategoryById(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch("/category/" + id, data);
      if (response.status === 200) {
        response.data.data && dispatch(updateCategory(response.data.data));
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
// single category
export function singelCategoryFetchById(id: string | number) {
  return async function singelCategoryFetchByIdThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.ERROR));
    try {
      const response = await APIWITHTOKEN.get("/category/" + id);
      if (response.status === 200) {
        dispatch(setSingleCategory(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: "Category not found" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message || err.message || "Something went wrong";
      return { success: false, message };
    }
  };
}

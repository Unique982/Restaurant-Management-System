import { Status } from "@/lib/types/type";
import { IBlogDetails, IInitialState } from "./blogSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import API from "@/lib/http";

const initialState: IInitialState = {
  blogData: [],
  singleBlog: null,
  status: Status.LOADING,
};

const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    fetchBlog(state: IInitialState, action: PayloadAction<IBlogDetails[]>) {
      state.blogData = action.payload;
    },
    setSingleBlog(
      state: IInitialState,
      action: PayloadAction<IBlogDetails | null>
    ) {
      state.singleBlog = action.payload;
    },
  },
});

export const { setStatus, fetchBlog, setSingleBlog } = blogSlice.actions;
export default blogSlice.reducer;

// fetch api
export function fectchBlogs() {
  return async function fectchBlogsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`/blog`);
      if (response.status === 200) {
        dispatch(fetchBlog(response.data.data));
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

export function singleBlogs(id: string | number) {
  return async function singleBlogThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`/blog/${id}`);
      if (response.status === 200) {
        dispatch(setSingleBlog(response.data.data[0]));
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

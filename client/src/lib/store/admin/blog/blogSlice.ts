import { Status } from "@/lib/types/type";
import { IBlogDetails, IBlogPost, IInitialState } from "./blogSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import API from "@/lib/http";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

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
    addBlog(state: IInitialState, action: PayloadAction<IBlogDetails>) {
      state.blogData.push(action.payload);
    },
    updateBlogById(state: IInitialState, action: PayloadAction<IBlogDetails>) {
      const index = state.blogData.findIndex((b) => b.id === action.payload.id);

      if (index !== -1) {
        state.blogData[index] = action.payload;
      }
    },
    setBlogDeleteById(
      state: IInitialState,
      action: PayloadAction<string | number>
    ) {
      const blogId = action.payload;
      const index = state.blogData.findIndex((blog) => blog.id === blogId);
      if (index !== -1) {
        state.blogData.splice(index, 1);
      }
    },
  },
});

export const {
  setStatus,
  fetchBlog,
  setSingleBlog,
  addBlog,
  updateBlogById,
  setBlogDeleteById,
} = blogSlice.actions;
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
        dispatch(setSingleBlog(response.data.data));
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
export function createBlog(data: IBlogPost) {
  return async function createBlogThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post("blog", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        response.data.data && dispatch(addBlog(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { message: response.data?.message || "Failed!" };
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
export function editBlogById(id: string | number, data: IBlogPost) {
  return async function editBlogById(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(`/blog/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        response.data.data && dispatch(updateBlogById(response.data.data));
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
export function deleteBlogById(id: string | number) {
  return async function deleteBlogByIdThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.delete("/blog/" + id);
      if (response.status === 200) {
        dispatch(setBlogDeleteById(id));
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

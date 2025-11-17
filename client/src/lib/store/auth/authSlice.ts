import { Status } from "@/lib/types/type";
import { IInitialState, IUserData } from "./authSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import API from "@/lib/http";
import { ILoginData, IRegisterInput } from "@/lib/types/auth/authTypes";
import { use } from "react";

const initialState: IInitialState = {
  user: {
    username: "",
    token: "",
    role: "",
  },
  status: Status.LOADING,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    setUser(state: IInitialState, action: PayloadAction<IUserData>) {
      state.user = action.payload;
    },
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    logout(state: IInitialState) {
      state.user = { username: "", token: "", role: "" };
      // remove token
      localStorage.removeItem("token");
    },
  },
});
export const { setUser, setStatus, logout } = authSlice.actions;
export default authSlice.reducer;

// Login
export function userLogin(data: ILoginData) {
  return async function userLoginThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/login", data);
      if (response.status === 200) {
        const { token, user } = response.data;
        dispatch(
          setUser({
            username: user.username,
            email: user.email,
            token: token,
            role: user.role,
            id: user.id,
          })
        );
        localStorage.setItem("token", token);

        dispatch(setStatus(Status.SUCCESS));
        return { success: true, user };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data?.message || "Failed" };
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

//  register
export function userRegister(data: IRegisterInput) {
  return async function userRegisterThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/register", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        response.data.length > 0 && dispatch(setUser(response.data.data));
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
//  forget
export function forgetPassword(email: string) {
  return async function forgetPasswordThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/forget", { email });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, message: response.data.message };
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
//  otp verfiy
export function otpVerify(email: string, otp: number) {
  return async function forgetPasswordThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/otp", { email, otp });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, message: response.data.message };
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
//  password change
export function changePassord(email: string, password: string) {
  return async function changePassord(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/reset/password", {
        email,
        password,
      });
      if (response.status === 200) {
        return { success: true, message: response.data.message };
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
// logout
export function userLogout() {
  return async function userLogoutThunk(dispatch: AppDispatch) {
    dispatch(logout());
    return { success: true };
  };
}
// profile
export function profileUdate() {
  return async function profileUdateThunk() {};
}

export function loginWithGoogle() {
  return async function loginWithGoogleThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/");
      if (response.status === 200) {
        return { success: true, message: response.data.message };
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

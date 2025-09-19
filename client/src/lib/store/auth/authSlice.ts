import { Status } from "@/lib/types/type";
import { IInitialState, IUserData } from "./authSlice.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../store";
import API from "@/lib/http";
import { ILoginData, IRegisterInput } from "@/lib/types/auth/authTypes";

const initialState: IInitialState = {
  user: {
    username: "",
    token: "",
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
  },
});
export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;

// Login
export function userLogin(data: ILoginData) {
  return async function userLoginThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/login", data);
      if (response.status === 200) {
        dispatch(setUser(response.data.data));
        localStorage.setItem("token", response.data.token);
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
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
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
//  forget

export function forgetPassword(email: string) {
  return async function forgetPasswordThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/forget", email);
      if (response.status === 200) {
        response.data.data.length > 0 && dispatch(setUser(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
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
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
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
        dispatch(setStatus(Status.SUCCESS));
      }
    } catch (err) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

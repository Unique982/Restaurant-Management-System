import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";

export interface IProfile {
  username: string;
  email: string;
}

interface IProfileState {
  profile: IProfile | null;
  status: Status;
}
const initialState: IProfileState = {
  profile: null,
  status: Status.LOADING,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setProfile(state: IProfileState, action: PayloadAction<IProfile>) {
      state.profile = action.payload;
    },
  },
});

export const { setStatus, setProfile } = profileSlice.actions;
export default profileSlice.reducer;
// Get profile
export function profileGet() {
  return async function profileGetThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("/profile");
      if (response.status === 200) {
        dispatch(setProfile(response.data.data[0]));

        dispatch(setStatus(Status.SUCCESS));
        return { success: true, data: response.data.data[0] };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data?.message || "Failed" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      return {
        success: false,
        message:
          err.response?.data?.message || err.message || "Something went wrong",
      };
    }
  };
}

// profile update
export function profileUpdate(username: string, email: string) {
  return async function profileUpdateThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch("/profile", {
        username,
        email,
      });
      if (response.status === 200) {
        dispatch(setProfile(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, message: response.data.message };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data?.message || "Failed" };
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      const message =
        err.response?.data?.message || err.message || "Something went wrong";
      return { success: false, message };
    }
  };
}

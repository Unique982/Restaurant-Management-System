import { Status } from "@/lib/types/type";

export interface IUserData {
  id?: string | number;
  username: string;
  token: string;
  role: "admin" | "customer" | "";
  email?: string;
}

// profile data
export interface IProfile {
  email: string;
  username: string;
}

export interface IInitialState {
  user: IUserData;
  status: Status;
}

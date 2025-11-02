import { Status } from "@/lib/types/type";

export interface IUserData {
  username: string;
  token: string;
  role: "admin" | "customer" | "";
  email?: string;
}

export interface IInitialState {
  user: IUserData;
  status: Status;
}

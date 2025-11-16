import { Status } from "@/lib/types/type";

export interface IUserList {
  id: string | number;
  username: string;
  email: string;
  password: string;
  role: string;
  google_id: string | number | null;
  facebook: string | number | null;
  createdAt: string;
}
export interface IInitialState {
  usersData: IUserList[];
  status: Status;
  singleDetails: IUserList | null;
}

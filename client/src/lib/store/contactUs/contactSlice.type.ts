import { Status } from "@/lib/types/type";

export interface IContactUs extends IContactUsPost {
  id: string | number;
  createdAt: string;
  isReplied: boolean;
}
export interface IContactUsPost {
  username: string;
  email: string;
  phoneNumber: string;
  message: string;
}
export interface IInitialState {
  data: IContactUs[];
  status: Status;
}

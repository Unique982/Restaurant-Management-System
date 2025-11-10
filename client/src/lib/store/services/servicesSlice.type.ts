import { Status } from "@/lib/types/type";

export interface serviceItems extends postServiceItems {
  id: number | string;

  createdAt: string;
}
export interface postServiceItems {
  serviceTitle: string;
  serviceIcon: File | null;
  serviceDescription: string;
}
export interface IInitialState {
  data: serviceItems[];
  status: Status;
}

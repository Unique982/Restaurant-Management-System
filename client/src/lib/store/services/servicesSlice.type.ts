import { Status } from "@/lib/types/type";

export interface serviceItems {
  id: number | string;
  serviceTitle: string;
  serviceIcon: string;
  serviceDescription: string;
  createdAt: string;
}
export interface IInitialState {
  data: serviceItems[];
  status: Status;
}

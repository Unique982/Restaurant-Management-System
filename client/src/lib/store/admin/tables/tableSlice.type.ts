import { Status } from "@/lib/types/type";

export interface ITablesData {
  tableNumber: number;
  seats: string | number;
  tableStatus: tableStatus;
}
export enum tableStatus {
  "Available" = "available",
  "Unavailable" = "unavailable",
}

export interface ITables extends ITablesData {
  id: string | number;
  createdAt: string;
}

export interface IInitialState {
  data: ITables[];
  status: Status;
}

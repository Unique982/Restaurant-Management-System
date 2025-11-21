import { Status } from "@/lib/types/type";

export enum ReservationStatus {
  Pending = "pending",
  Booking = "booking",
  Cancelled = "cancelled",
}

export interface IUserReservation {
  username: string;
  id: string | number;
}
export interface ITablesReservation {
  id: string | number;
  tableNumber: string | number;
}

export interface IReservationPostData {
  user_id?: string | number | null;
  table_id: string | number;
  guests: number;
  reservation_date: string;
  reservation_time: string;
  status: ReservationStatus;
  specailRequest: string;
  name?: string | null;
  phoneNumber?: string | null;
  deleted_at?: string | null | boolean;
  tableNumber?: string | number;
}

export interface IIReservation extends IReservationPostData {
  id: string | number;
  createdAt: string;
  updatedAt?: string;
  user: IUserReservation;
  table: ITablesReservation;
}

export interface IInitialState {
  reservationData: IIReservation[];
  status: Status;
  singleDetails: IIReservation | null;
}

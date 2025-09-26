import { Status } from "@/lib/types/type";

export enum OrderType {
  DineIn = "dine_in",
  TakeAway = "take_away",
  Delivery = "delivery",
}
export enum OrderStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Preparing = "preparing",
  Cancelled = "cancelled",
  Ready = "ready",
  Completed = "completed",
}
export enum PaymentMethod {
  Cash = "cash",
  Khalti = "khalti",
  Esewa = "esewa",
}
export enum PaymentStatus {
  Unpaid = "unpaid",
  Paid = "paid",
}

export interface IOrderItem {
  id: string | number;
  quantity: number;
  price?: number;
}
export interface ITableData {
  id: string | number;
  tableNumber: string | number;
}
export interface IIUserOrderData {
  id: string | number;
  username: string;
}
export interface IOrderPostData {
  user_id: string | number;
  table_id: string | number;
  order_type: OrderType;
  discount?: number;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  special_request?: string;
  delivery_address?: string;
  items: IOrderItem[];
  deleted_at: Boolean;
}
export interface IIOrderItems extends IOrderPostData {
  order_id: string | number;
  created_at: string;
  table: ITableData;
  user?: IIUserOrderData;
}

export interface IInitialState {
  orderDatas: IIOrderItems[];
  status: Status;
}

import { Status } from "@/lib/types/type";

export interface cartItems {
  id: number;
  cart_id: number;
  menu_item_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
export interface DeteleAction {
  cart_id: number | number;
}
export interface IInitialState {
  items: cartItems[];
  status: Status;
}

import { PaymentMethod } from "../../admin/orders/orders.types";

export interface IData {
  name: string;
  phone: string;
  email: string;
  city: string;
  zip_code: string;
  delivery_address: string;
  totalAmount: number;
  payment_method: PaymentMethod;
}
export interface IOrderResponse {
  order_id: number;
  total_amount: number;
  final_amount: number;
  status: string;
  payment_status: string;
  payment_url?: string;
  pidx?: string;
}

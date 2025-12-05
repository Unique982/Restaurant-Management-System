import { Status } from "@/lib/types/type";
import { exportTraceState } from "next/dist/trace";

export interface IPayment {
  id: string | number;
  orderId: string | number;
  amount: number;
  paymentStatus: IPaymentStatus;
  payment_method: PaymentMethod;
  total_amount: string | number;
  invoice_number: string | number;
  createdAt: string;
  updatedAt?: string;
  username?: string;
  email: string;
}

export enum IPaymentStatus {
  Completed = "completed",
  Pending = "pending",
  Failed = "failed",
}

export enum PaymentMethod {
  Cash = "cash",
  Card = "card",
  Khalti = "khalti",
}

export interface IInitialState {
  status: Status;
  paymentData: IPayment[];
  singlePayment: IPayment | null;
}

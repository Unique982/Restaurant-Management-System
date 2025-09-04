import { Request } from "express";
export enum userRole {
  Admin = "admin",
  customer = "customer",
}
export interface IExtendedRequest extends Request {
  user?: {
    id: string | any | number;
    role: userRole;
  };
}

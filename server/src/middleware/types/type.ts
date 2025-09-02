import { Request } from "express";
export enum userRole {
  Admin = "admin",
  customer = "customer",
}
export interface IExtended extends Request {
  user?: {
    id: string;
    role: userRole;
    email: string;
  };
}

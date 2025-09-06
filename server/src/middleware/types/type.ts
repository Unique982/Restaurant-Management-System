import { Request } from "express";
export enum userRole {
  Admin = "admin",
  customer = "customer",
}
export interface IExtendedRequest extends Request {
  user?: {
    id: number;
    role: userRole;
    username: string;
    password: string;
  };
}

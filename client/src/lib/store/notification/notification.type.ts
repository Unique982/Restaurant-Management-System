import { Status } from "@/lib/types/type";

export interface INotificationType {
  id: number;
  title: string;
  description: string;
  type: string;
  user_id: number;
  user_role: string;
  status: "read" | "unread";
  created_at: string;
}

export interface IInitialState {
  notificationData: INotificationType[];
  status: Status;
}

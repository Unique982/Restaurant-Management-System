import { Status } from "@/lib/types/type";

export interface IMenuItemsData {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  image_url: string;
  type?: string;
  availability?: string;
  ingredients?: string;
}
export interface IMenuItems extends IMenuItemsData {
  id: string;
  createdAt: string;
}
export interface IInitialState {
  data: IMenuItems[];
  status: Status;
}

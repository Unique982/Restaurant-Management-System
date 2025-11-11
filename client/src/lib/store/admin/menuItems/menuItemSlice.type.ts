import { Status } from "@/lib/types/type";

export interface IMenuItemsData {
  name: string;
  description: string;
  price: string;
  category_id: string;
  image_url: string;
  type?: string;
  availability?: string;
  ingredients?: string;
}
export interface IMenuItems extends IMenuItemsData {
  id: string;
  caegoryName: string;
  created_at: string;
  categoryName: string;
  updated_at: string;
}
export interface IInitialState {
  menuDatas: IMenuItems[];
  status: Status;
  singleMenu: IMenuItems | null;
}

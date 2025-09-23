import { Status } from "@/lib/types/type";

export interface ICategoryData {
  categoryName: string;
  categoryDescription: string;
}

export interface ICategory extends ICategoryData {
  id: string | number;
  createdAt: string;
}
export interface IInitialState {
  data: ICategory[];
  status: Status;
}

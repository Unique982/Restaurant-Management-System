import { Status } from "@/lib/types/type";

export interface ICategoryList {
  categoryName: string;
  id: number | string;
  categoryDescription: string;
}
export interface IInitialState {
  data: ICategoryList[];
  status: Status;
}

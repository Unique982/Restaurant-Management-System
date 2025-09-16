import { Status } from "@/lib/types/type";

export interface ICategoryData {
  categoryName: string;
  categoryDescription: string;
}

export interface IInitialState {
  data: ICategoryData[];
  status: Status;
}

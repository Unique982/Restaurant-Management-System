import { Status } from "@/lib/types/type";

export interface IBlogPost {
  blogTitle: string;
  blogDescription: string;
  blogImage: string;
  blogCategory: string;
}
export interface IBlogDetails extends IBlogPost {
  id: string | number;
  createdAt: string;
}

export interface IInitialState {
  blogData: IBlogDetails[];
  status: Status;
}

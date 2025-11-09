import { Status } from "@/lib/types/type";

export interface IBlogPost {
  blogTitle: string;
  blogDescription: string;
  blogImage: string;
  blogCategory: string;
}
export interface IBlogDetails extends IBlogPost {
  id: number;
  createdAt: string;
}

export interface IInitialState {
  blogData: IBlogDetails[];
  status: Status;
  singleBlog: IBlogDetails | null;
}

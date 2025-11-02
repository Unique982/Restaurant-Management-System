import { Status } from "@/lib/types/type";

export interface IAboutPost {
  aboutTitle: string;
  aboutDescription: string;
  aboutImage: string;
}
export interface IAbout extends IAboutPost {
  id: string | number;
  createdAt: string;
}
export interface IInitialState {
  about: IAbout[];
  status: Status;
}

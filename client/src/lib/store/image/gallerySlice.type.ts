import { Status } from "@/lib/types/type";

export interface GalleryItems {
  id: number | string;
  address: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
}
export interface GalleryList {
  data: GalleryItems[];
  status: Status;
}

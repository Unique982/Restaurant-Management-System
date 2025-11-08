import { Status } from "@/lib/types/type";

export interface ISettingPostData {
  restaurantName: string;
  address: string;
  contactNumber: string;
  openingTime: string;
  closingTime: string;
  timezone: string;
  websiteUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  emailSenderName: string;
  smtpHost: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;
  smtpEncryption: string;
}
export interface IISetting extends ISettingPostData {
  id: string | number;
  createdAt: string;
}

export interface IInitialState {
  setting: IISetting[];
  status: Status;
}
